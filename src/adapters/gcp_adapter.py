from google.cloud import compute_v1
from google.cloud import storage
from google.cloud.sql import v1beta4
from typing import Dict, List, Optional, Any
import logging
from .base import (
    CloudAdapter, CloudCredentials, ComputeInstance, Database,
    StorageBucket, NetworkInfo
)

logger = logging.getLogger(__name__)

class GCPAdapter(CloudAdapter):
    """GCP-specific implementation of CloudAdapter"""
    
    def __init__(self, credentials: CloudCredentials):
        super().__init__(credentials)
        
        self.project_id = credentials.credentials.get('project_id')
        self.zone = credentials.credentials.get('zone', 'us-central1-a')
        
        # Initialize GCP clients
        self.compute_client = compute_v1.InstancesClient()
        self.storage_client = storage.Client(project=self.project_id)
        self.sql_client = v1beta4.CloudSqlInstancesServiceClient()
        self.networks_client = compute_v1.NetworksClient()
        self.subnets_client = compute_v1.SubnetworksClient()
    
    async def discover_compute_instances(self) -> List[ComputeInstance]:
        """Discover all GCE instances"""
        try:
            instances = []
            request = compute_v1.AggregatedListInstancesRequest(
                project=self.project_id
            )
            
            agg_list = self.compute_client.aggregated_list(request=request)
            
            for zone, response in agg_list:
                if response.instances:
                    for instance in response.instances:
                        # Get machine type details
                        machine_type = instance.machine_type.split('/')[-1]
                        
                        # Get IPs
                        private_ip = instance.network_interfaces[0].network_i_p if instance.network_interfaces else None
                        public_ip = None
                        if instance.network_interfaces and instance.network_interfaces[0].access_configs:
                            public_ip = instance.network_interfaces[0].access_configs[0].nat_i_p
                        
                        # Get disk size
                        disk_size = sum(disk.disk_size_gb for disk in instance.disks)
                        
                        instances.append(ComputeInstance(
                            id=str(instance.id),
                            name=instance.name,
                            instance_type=machine_type,
                            cpu_cores=self._get_cpu_count(machine_type),
                            memory_gb=self._get_memory_gb(machine_type),
                            disk_gb=float(disk_size),
                            state=instance.status.lower(),
                            private_ip=private_ip,
                            public_ip=public_ip,
                            tags=dict(instance.labels) if instance.labels else {},
                            metadata={
                                'zone': zone,
                                'project': self.project_id,
                                'self_link': instance.self_link
                            }
                        ))
            
            logger.info(f"Discovered {len(instances)} GCE instances")
            return instances
            
        except Exception as e:
            logger.error(f"Error discovering GCE instances: {e}")
            raise
    
    async def discover_databases(self) -> List[Database]:
        """Discover Cloud SQL instances"""
        try:
            databases = []
            
            request = v1beta4.SqlInstancesListRequest(
                project=self.project_id
            )
            
            response = self.sql_client.list(request=request)
            
            for db_instance in response.items:
                databases.append(Database(
                    id=db_instance.name,
                    name=db_instance.name,
                    engine=db_instance.database_version.split('_')[0].lower(),
                    engine_version=db_instance.database_version,
                    instance_class=db_instance.settings.tier,
                    storage_gb=db_instance.settings.data_disk_size_gb,
                    state=db_instance.state,
                    endpoint=db_instance.ip_addresses[0].ip_address if db_instance.ip_addresses else None,
                    port=3306 if 'MYSQL' in db_instance.database_version else 5432,
                    tags=dict(db_instance.settings.user_labels) if db_instance.settings.user_labels else {}
                ))
            
            logger.info(f"Discovered {len(databases)} Cloud SQL instances")
            return databases
            
        except Exception as e:
            logger.error(f"Error discovering Cloud SQL: {e}")
            raise
    
    async def discover_storage(self) -> List[StorageBucket]:
        """Discover GCS buckets"""
        try:
            buckets = []
            
            for bucket in self.storage_client.list_buckets():
                # Get bucket size (would need to iterate blobs for accurate count)
                buckets.append(StorageBucket(
                    id=bucket.name,
                    name=bucket.name,
                    size_gb=0,  # Would calculate from blob sizes
                    object_count=0,
                    storage_class=bucket.storage_class,
                    region=bucket.location,
                    tags=dict(bucket.labels) if bucket.labels else {}
                ))
            
            logger.info(f"Discovered {len(buckets)} GCS buckets")
            return buckets
            
        except Exception as e:
            logger.error(f"Error discovering GCS: {e}")
            raise
    
    async def discover_network(self) -> NetworkInfo:
        """Discover VPC network topology"""
        try:
            request = compute_v1.ListNetworksRequest(project=self.project_id)
            networks = list(self.networks_client.list(request=request))
            
            if not networks:
                return NetworkInfo(vpc_id='', subnets=[], security_groups=[], route_tables=[])
            
            network = networks[0]
            network_id = network.self_link
            
            # Get subnets
            subnets_request = compute_v1.AggregatedListSubnetworksRequest(
                project=self.project_id
            )
            subnets_agg = self.subnets_client.aggregated_list(request=subnets_request)
            
            subnets = []
            for region, response in subnets_agg:
                if response.subnetworks:
                    for subnet in response.subnetworks:
                        subnets.append({
                            'id': subnet.self_link,
                            'cidr': subnet.ip_cidr_range,
                            'region': region
                        })
            
            return NetworkInfo(
                vpc_id=network_id,
                subnets=subnets,
                security_groups=[],  # GCP uses firewall rules, not security groups
                route_tables=[]
            )
            
        except Exception as e:
            logger.error(f"Error discovering GCP network: {e}")
            raise
    
    # Stub implementations for migration methods
    async def create_compute_instance(self, specs: Dict[str, Any]) -> ComputeInstance:
        raise NotImplementedError("GCE instance creation pending")
    
    async def start_replication(self, source_id: str, target_specs: Dict[str, Any]) -> str:
        raise NotImplementedError("Migrate for Compute Engine integration pending")
    
    async def get_replication_status(self, replication_id: str) -> Dict[str, Any]:
        raise NotImplementedError("Replication status pending")
    
    async def cutover_instance(self, replication_id: str) -> ComputeInstance:
        raise NotImplementedError("Cutover implementation pending")
    
    async def convert_to_container(self, instance_id: str) -> Dict[str, Any]:
        raise NotImplementedError("Container conversion pending")
    
    async def deploy_container(self, image_uri: str, specs: Dict[str, Any]) -> str:
        raise NotImplementedError("GKE deployment pending")
    
    async def migrate_database(self, source_db: Database, target_specs: Dict[str, Any]) -> Database:
        raise NotImplementedError("Database migration pending")
    
    async def create_serverless_function(self, code: str, runtime: str, config: Dict[str, Any]) -> str:
        raise NotImplementedError("Cloud Functions pending")
    
    async def estimate_cost(self, resource_specs: Dict[str, Any]) -> Dict[str, float]:
        return {'compute': 0.0, 'storage': 0.0, 'network': 0.0, 'total': 0.0}
    
    async def run_validation_tests(self, resource_id: str, tests: List[str]) -> Dict[str, bool]:
        return {test: True for test in tests}
    
    async def create_snapshot(self, resource_id: str) -> str:
        raise NotImplementedError("Snapshot creation pending")
    
    async def restore_from_snapshot(self, snapshot_id: str) -> str:
        raise NotImplementedError("Restore pending")
    
    async def delete_resource(self, resource_id: str, resource_type: str) -> bool:
        return True
    
    async def tag_resource(self, resource_id: str, tags: Dict[str, str]) -> bool:
        return True
    
    async def get_metrics(self, resource_id: str, metric_names: List[str],
                         start_time: str, end_time: str) -> Dict[str, List[float]]:
        return {}
    
    # Helper methods
    def _get_cpu_count(self, machine_type: str) -> int:
        """Get CPU count for machine type"""
        if 'n1-standard' in machine_type:
            return int(machine_type.split('-')[-1])
        cpu_map = {
            'f1-micro': 1, 'g1-small': 1,
            'n1-standard-1': 1, 'n1-standard-2': 2, 'n1-standard-4': 4,
            'n2-standard-2': 2, 'n2-standard-4': 4,
        }
        return cpu_map.get(machine_type, 2)
    
    def _get_memory_gb(self, machine_type: str) -> float:
        """Get memory for machine type"""
        memory_map = {
            'f1-micro': 0.6, 'g1-small': 1.7,
            'n1-standard-1': 3.75, 'n1-standard-2': 7.5, 'n1-standard-4': 15,
            'n2-standard-2': 8, 'n2-standard-4': 16,
        }
        return memory_map.get(machine_type, 4.0)
