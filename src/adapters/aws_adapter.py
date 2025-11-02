import boto3
import asyncio
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from .base import (
    CloudAdapter, CloudCredentials, ComputeInstance, Database, 
    StorageBucket, NetworkInfo
)
import logging

logger = logging.getLogger(__name__)

class AWSAdapter(CloudAdapter):
    """AWS-specific implementation of CloudAdapter"""
    
    def __init__(self, credentials: CloudCredentials):
        super().__init__(credentials)
        self.ec2_client = boto3.client(
            'ec2',
            aws_access_key_id=credentials.credentials.get('access_key_id'),
            aws_secret_access_key=credentials.credentials.get('secret_access_key'),
            region_name=credentials.region
        )
        self.rds_client = boto3.client('rds', region_name=credentials.region)
        self.s3_client = boto3.client('s3', region_name=credentials.region)
        self.mgn_client = boto3.client('mgn', region_name=credentials.region)  # Application Migration Service
        self.lambda_client = boto3.client('lambda', region_name=credentials.region)
        self.cloudwatch = boto3.client('cloudwatch', region_name=credentials.region)
        self.dms_client = boto3.client('dms', region_name=credentials.region)  # Database Migration Service
        self.pricing_client = boto3.client('pricing', region_name='us-east-1')  # Pricing API only in us-east-1
    
    async def discover_compute_instances(self) -> List[ComputeInstance]:
        """Discover all EC2 instances"""
        try:
            response = self.ec2_client.describe_instances()
            instances = []
            
            for reservation in response['Reservations']:
                for instance in reservation['Instances']:
                    # Get instance type details
                    instance_type = instance['InstanceType']
                    
                    # Map tags
                    tags = {tag['Key']: tag['Value'] for tag in instance.get('Tags', [])}
                    
                    instances.append(ComputeInstance(
                        id=instance['InstanceId'],
                        name=tags.get('Name', instance['InstanceId']),
                        instance_type=instance_type,
                        cpu_cores=self._get_cpu_count(instance_type),
                        memory_gb=self._get_memory_gb(instance_type),
                        disk_gb=self._get_disk_size(instance),
                        state=instance['State']['Name'],
                        private_ip=instance.get('PrivateIpAddress'),
                        public_ip=instance.get('PublicIpAddress'),
                        tags=tags,
                        metadata={
                            'availability_zone': instance['Placement']['AvailabilityZone'],
                            'vpc_id': instance.get('VpcId'),
                            'subnet_id': instance.get('SubnetId'),
                            'security_groups': [sg['GroupId'] for sg in instance.get('SecurityGroups', [])],
                            'launch_time': instance['LaunchTime'].isoformat()
                        }
                    ))
            
            logger.info(f"Discovered {len(instances)} EC2 instances")
            return instances
            
        except Exception as e:
            logger.error(f"Error discovering EC2 instances: {e}")
            raise
    
    async def discover_databases(self) -> List[Database]:
        """Discover all RDS databases"""
        try:
            response = self.rds_client.describe_db_instances()
            databases = []
            
            for db in response['DBInstances']:
                databases.append(Database(
                    id=db['DBInstanceIdentifier'],
                    name=db['DBInstanceIdentifier'],
                    engine=db['Engine'],
                    engine_version=db['EngineVersion'],
                    instance_class=db['DBInstanceClass'],
                    storage_gb=db['AllocatedStorage'],
                    state=db['DBInstanceStatus'],
                    endpoint=db.get('Endpoint', {}).get('Address'),
                    port=db.get('Endpoint', {}).get('Port'),
                    multi_az=db['MultiAZ'],
                    tags={tag['Key']: tag['Value'] for tag in db.get('TagList', [])}
                ))
            
            logger.info(f"Discovered {len(databases)} RDS databases")
            return databases
            
        except Exception as e:
            logger.error(f"Error discovering RDS databases: {e}")
            raise
    
    async def discover_storage(self) -> List[StorageBucket]:
        """Discover all S3 buckets"""
        try:
            response = self.s3_client.list_buckets()
            buckets = []
            
            for bucket in response['Buckets']:
                bucket_name = bucket['Name']
                
                # Get bucket size and object count
                try:
                    cloudwatch_data = self.cloudwatch.get_metric_statistics(
                        Namespace='AWS/S3',
                        MetricName='BucketSizeBytes',
                        Dimensions=[
                            {'Name': 'BucketName', 'Value': bucket_name},
                            {'Name': 'StorageType', 'Value': 'StandardStorage'}
                        ],
                        StartTime=datetime.utcnow() - timedelta(days=1),
                        EndTime=datetime.utcnow(),
                        Period=86400,
                        Statistics=['Average']
                    )
                    
                    size_gb = 0
                    if cloudwatch_data['Datapoints']:
                        size_bytes = cloudwatch_data['Datapoints'][0]['Average']
                        size_gb = size_bytes / (1024**3)
                    
                    # Get bucket location
                    location = self.s3_client.get_bucket_location(Bucket=bucket_name)
                    region = location['LocationConstraint'] or 'us-east-1'
                    
                    # Get tags
                    try:
                        tags_response = self.s3_client.get_bucket_tagging(Bucket=bucket_name)
                        tags = {tag['Key']: tag['Value'] for tag in tags_response['TagSet']}
                    except:
                        tags = {}
                    
                    buckets.append(StorageBucket(
                        id=bucket_name,
                        name=bucket_name,
                        size_gb=size_gb,
                        object_count=0,  # Would need to iterate objects for exact count
                        storage_class='STANDARD',
                        region=region,
                        tags=tags
                    ))
                except Exception as e:
                    logger.warning(f"Could not get details for bucket {bucket_name}: {e}")
            
            logger.info(f"Discovered {len(buckets)} S3 buckets")
            return buckets
            
        except Exception as e:
            logger.error(f"Error discovering S3 buckets: {e}")
            raise
    
    async def discover_network(self) -> NetworkInfo:
        """Discover VPC network topology"""
        try:
            vpcs = self.ec2_client.describe_vpcs()['Vpcs']
            if not vpcs:
                return NetworkInfo(vpc_id='', subnets=[], security_groups=[], route_tables=[])
            
            vpc_id = vpcs[0]['VpcId']  # Get default VPC or first VPC
            
            subnets = self.ec2_client.describe_subnets(Filters=[{'Name': 'vpc-id', 'Values': [vpc_id]}])['Subnets']
            security_groups = self.ec2_client.describe_security_groups(Filters=[{'Name': 'vpc-id', 'Values': [vpc_id]}])['SecurityGroups']
            route_tables = self.ec2_client.describe_route_tables(Filters=[{'Name': 'vpc-id', 'Values': [vpc_id]}])['RouteTables']
            
            return NetworkInfo(
                vpc_id=vpc_id,
                subnets=[{
                    'id': s['SubnetId'],
                    'cidr': s['CidrBlock'],
                    'az': s['AvailabilityZone']
                } for s in subnets],
                security_groups=[{
                    'id': sg['GroupId'],
                    'name': sg['GroupName'],
                    'rules': sg['IpPermissions']
                } for sg in security_groups],
                route_tables=[{
                    'id': rt['RouteTableId'],
                    'routes': rt['Routes']
                } for rt in route_tables]
            )
            
        except Exception as e:
            logger.error(f"Error discovering network: {e}")
            raise
    
    async def create_compute_instance(self, specs: Dict[str, Any]) -> ComputeInstance:
        """Create new EC2 instance"""
        try:
            response = self.ec2_client.run_instances(
                ImageId=specs['ami_id'],
                InstanceType=specs['instance_type'],
                MinCount=1,
                MaxCount=1,
                KeyName=specs.get('key_name'),
                SecurityGroupIds=specs.get('security_group_ids', []),
                SubnetId=specs.get('subnet_id'),
                TagSpecifications=[{
                    'ResourceType': 'instance',
                    'Tags': [{'Key': k, 'Value': v} for k, v in specs.get('tags', {}).items()]
                }]
            )
            
            instance = response['Instances'][0]
            return ComputeInstance(
                id=instance['InstanceId'],
                name=specs.get('tags', {}).get('Name', instance['InstanceId']),
                instance_type=instance['InstanceType'],
                cpu_cores=self._get_cpu_count(instance['InstanceType']),
                memory_gb=self._get_memory_gb(instance['InstanceType']),
                disk_gb=0,  # Will be updated after volumes attach
                state=instance['State']['Name'],
                tags=specs.get('tags', {})
            )
            
        except Exception as e:
            logger.error(f"Error creating EC2 instance: {e}")
            raise
    
    async def start_replication(self, source_id: str, target_specs: Dict[str, Any]) -> str:
        """Start replication using AWS Application Migration Service (MGN)"""
        try:
            # Initialize source server in MGN
            response = self.mgn_client.start_replication(
                sourceServerID=source_id,
            )
            return response['job']['jobID']
        except Exception as e:
            logger.error(f"Error starting replication: {e}")
            raise
    
    async def get_replication_status(self, replication_id: str) -> Dict[str, Any]:
        """Get MGN replication status"""
        try:
            response = self.mgn_client.describe_job_log_items(jobID=replication_id)
            return {
                'status': response['items'][0]['event'] if response['items'] else 'unknown',
                'progress': 0,  # Calculate from log items
                'details': response
            }
        except Exception as e:
            logger.error(f"Error getting replication status: {e}")
            return {'status': 'error', 'error': str(e)}
    
    async def cutover_instance(self, replication_id: str) -> ComputeInstance:
        """Perform cutover"""
        # Implementation would finalize MGN replication and launch target instance
        raise NotImplementedError("Cutover implementation pending")
    
    async def convert_to_container(self, instance_id: str) -> Dict[str, Any]:
        """Convert EC2 instance to container image"""
        # Would use AWS Image Builder or custom containerization process
        raise NotImplementedError("Container conversion pending")
    
    async def deploy_container(self, image_uri: str, specs: Dict[str, Any]) -> str:
        """Deploy to ECS/EKS"""
        raise NotImplementedError("Container deployment pending")
    
    async def migrate_database(self, source_db: Database, target_specs: Dict[str, Any]) -> Database:
        """Migrate database using AWS DMS"""
        raise NotImplementedError("Database migration pending")
    
    async def create_serverless_function(self, code: str, runtime: str, config: Dict[str, Any]) -> str:
        """Create Lambda function"""
        try:
            response = self.lambda_client.create_function(
                FunctionName=config['name'],
                Runtime=runtime,
                Role=config['role_arn'],
                Handler=config['handler'],
                Code={'ZipFile': code.encode()},
                Timeout=config.get('timeout', 30),
                MemorySize=config.get('memory', 128)
            )
            return response['FunctionArn']
        except Exception as e:
            logger.error(f"Error creating Lambda function: {e}")
            raise
    
    async def estimate_cost(self, resource_specs: Dict[str, Any]) -> Dict[str, float]:
        """Estimate AWS costs"""
        # Implementation would use AWS Pricing API
        return {
            'compute': 0.0,
            'storage': 0.0,
            'network': 0.0,
            'total': 0.0
        }
    
    async def run_validation_tests(self, resource_id: str, tests: List[str]) -> Dict[str, bool]:
        """Run validation tests"""
        results = {}
        for test in tests:
            # Implement various validation tests
            results[test] = True
        return results
    
    async def create_snapshot(self, resource_id: str) -> str:
        """Create EBS snapshot or RDS snapshot"""
        try:
            response = self.ec2_client.create_snapshot(
                VolumeId=resource_id,
                Description=f"Rollback snapshot for {resource_id}"
            )
            return response['SnapshotId']
        except Exception as e:
            logger.error(f"Error creating snapshot: {e}")
            raise
    
    async def restore_from_snapshot(self, snapshot_id: str) -> str:
        """Restore from snapshot"""
        raise NotImplementedError("Restore implementation pending")
    
    async def delete_resource(self, resource_id: str, resource_type: str) -> bool:
        """Delete AWS resource"""
        try:
            if resource_type == 'ec2':
                self.ec2_client.terminate_instances(InstanceIds=[resource_id])
            elif resource_type == 'rds':
                self.rds_client.delete_db_instance(
                    DBInstanceIdentifier=resource_id,
                    SkipFinalSnapshot=True
                )
            return True
        except Exception as e:
            logger.error(f"Error deleting resource: {e}")
            return False
    
    async def tag_resource(self, resource_id: str, tags: Dict[str, str]) -> bool:
        """Add tags to resource"""
        try:
            self.ec2_client.create_tags(
                Resources=[resource_id],
                Tags=[{'Key': k, 'Value': v} for k, v in tags.items()]
            )
            return True
        except Exception as e:
            logger.error(f"Error tagging resource: {e}")
            return False
    
    async def get_metrics(self, resource_id: str, metric_names: List[str],
                         start_time: str, end_time: str) -> Dict[str, List[float]]:
        """Get CloudWatch metrics"""
        try:
            metrics = {}
            for metric_name in metric_names:
                response = self.cloudwatch.get_metric_statistics(
                    Namespace='AWS/EC2',
                    MetricName=metric_name,
                    Dimensions=[{'Name': 'InstanceId', 'Value': resource_id}],
                    StartTime=start_time,
                    EndTime=end_time,
                    Period=300,
                    Statistics=['Average']
                )
                metrics[metric_name] = [dp['Average'] for dp in response['Datapoints']]
            return metrics
        except Exception as e:
            logger.error(f"Error getting metrics: {e}")
            return {}
    
    # Helper methods
    def _get_cpu_count(self, instance_type: str) -> int:
        """Get CPU count for instance type"""
        # Simplified mapping - would use actual AWS API
        cpu_map = {
            't2.micro': 1, 't2.small': 1, 't2.medium': 2,
            't3.micro': 2, 't3.small': 2, 't3.medium': 2,
            'm5.large': 2, 'm5.xlarge': 4, 'm5.2xlarge': 8,
        }
        return cpu_map.get(instance_type, 2)
    
    def _get_memory_gb(self, instance_type: str) -> float:
        """Get memory for instance type"""
        memory_map = {
            't2.micro': 1, 't2.small': 2, 't2.medium': 4,
            't3.micro': 1, 't3.small': 2, 't3.medium': 4,
            'm5.large': 8, 'm5.xlarge': 16, 'm5.2xlarge': 32,
        }
        return memory_map.get(instance_type, 4.0)
    
    def _get_disk_size(self, instance: Dict) -> float:
        """Calculate total disk size from block device mappings"""
        total = 0
        for bdm in instance.get('BlockDeviceMappings', []):
            if 'Ebs' in bdm:
                total += bdm['Ebs'].get('VolumeSize', 0)
        return float(total)
