from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.storage import StorageManagementClient
from azure.mgmt.sql import SqlManagementClient
from azure.mgmt.resource import ResourceManagementClient
from typing import Dict, List, Optional, Any
import logging
from .base import (
    CloudAdapter, CloudCredentials, ComputeInstance, Database,
    StorageBucket, NetworkInfo
)

logger = logging.getLogger(__name__)

class AzureAdapter(CloudAdapter):
    """Azure-specific implementation of CloudAdapter"""
    
    def __init__(self, credentials: CloudCredentials):
        super().__init__(credentials)
        
        subscription_id = credentials.credentials.get('subscription_id')
        
        # Initialize Azure SDK clients
        credential = DefaultAzureCredential()
        self.compute_client = ComputeManagementClient(credential, subscription_id)
        self.network_client = NetworkManagementClient(credential, subscription_id)
        self.storage_client = StorageManagementClient(credential, subscription_id)
        self.sql_client = SqlManagementClient(credential, subscription_id)
        self.resource_client = ResourceManagementClient(credential, subscription_id)
    
    async def discover_compute_instances(self) -> List[ComputeInstance]:
        """Discover all Azure VMs"""
        try:
            instances = []
            vms = self.compute_client.virtual_machines.list_all()
            
            for vm in vms:
                # Get instance size details
                size_name = vm.hardware_profile.vm_size
                
                # Get NIC details for IP addresses
                nic_ref = vm.network_profile.network_interfaces[0].id
                nic_name = nic_ref.split('/')[-1]
                resource_group = nic_ref.split('/')[4]
                
                try:
                    nic = self.network_client.network_interfaces.get(resource_group, nic_name)
                    private_ip = nic.ip_configurations[0].private_ip_address
                    public_ip = None
                    if nic.ip_configurations[0].public_ip_address:
                        pip_name = nic.ip_configurations[0].public_ip_address.id.split('/')[-1]
                        pip = self.network_client.public_ip_addresses.get(resource_group, pip_name)
                        public_ip = pip.ip_address
                except:
                    private_ip = None
                    public_ip = None
                
                instances.append(ComputeInstance(
                    id=vm.id,
                    name=vm.name,
                    instance_type=size_name,
                    cpu_cores=self._get_cpu_count(size_name),
                    memory_gb=self._get_memory_gb(size_name),
                    disk_gb=self._get_disk_size(vm),
                    state=vm.instance_view.statuses[1].code.split('/')[-1] if vm.instance_view else 'unknown',
                    private_ip=private_ip,
                    public_ip=public_ip,
                    tags=vm.tags or {},
                    metadata={
                        'resource_group': resource_group,
                        'location': vm.location,
                        'availability_zone': vm.zones[0] if vm.zones else None,
                        'os_type': vm.storage_profile.os_disk.os_type
                    }
                ))
            
            logger.info(f"Discovered {len(instances)} Azure VMs")
            return instances
            
        except Exception as e:
            logger.error(f"Error discovering Azure VMs: {e}")
            raise
    
    async def discover_databases(self) -> List[Database]:
        """Discover Azure SQL databases"""
        try:
            databases = []
            
            for resource_group in self.resource_client.resource_groups.list():
                servers = self.sql_client.servers.list_by_resource_group(resource_group.name)
                
                for server in servers:
                    dbs = self.sql_client.databases.list_by_server(resource_group.name, server.name)
                    
                    for db in dbs:
                        if db.name != 'master':  # Skip system database
                            databases.append(Database(
                                id=db.id,
                                name=db.name,
                                engine='mssql',  # Azure SQL
                                engine_version=server.version,
                                instance_class=db.sku.name if db.sku else 'unknown',
                                storage_gb=db.max_size_bytes / (1024**3) if db.max_size_bytes else 0,
                                state=db.status,
                                endpoint=f"{server.fully_qualified_domain_name}",
                                port=1433,
                                tags=db.tags or {}
                            ))
            
            logger.info(f"Discovered {len(databases)} Azure SQL databases")
            return databases
            
        except Exception as e:
            logger.error(f"Error discovering Azure SQL: {e}")
            raise
    
    async def discover_storage(self) -> List[StorageBucket]:
        """Discover Azure Storage accounts and containers"""
        try:
            buckets = []
            
            for account in self.storage_client.storage_accounts.list():
                # Storage accounts in Azure are like S3 buckets
                buckets.append(StorageBucket(
                    id=account.id,
                    name=account.name,
                    size_gb=0,  # Would need to query metrics
                    object_count=0,
                    storage_class=account.sku.name,
                    region=account.location,
                    tags=account.tags or {}
                ))
            
            logger.info(f"Discovered {len(buckets)} Azure Storage accounts")
            return buckets
            
        except Exception as e:
            logger.error(f"Error discovering Azure Storage: {e}")
            raise
    
    async def discover_network(self) -> NetworkInfo:
        """Discover Azure VNet topology"""
        try:
            vnets = list(self.network_client.virtual_networks.list_all())
            if not vnets:
                return NetworkInfo(vpc_id='', subnets=[], security_groups=[], route_tables=[])
            
            vnet = vnets[0]
            vnet_id = vnet.id
            resource_group = vnet_id.split('/')[4]
            
            # Get subnets
            subnets = [{
                'id': subnet.id,
                'cidr': subnet.address_prefix,
                'name': subnet.name
            } for subnet in vnet.subnets]
            
            # Get NSGs (Network Security Groups)
            nsgs = list(self.network_client.network_security_groups.list(resource_group))
            security_groups = [{
                'id': nsg.id,
                'name': nsg.name,
                'rules': [{
                    'name': rule.name,
                    'priority': rule.priority,
                    'direction': rule.direction
                } for rule in nsg.security_rules]
            } for nsg in nsgs]
            
            # Get route tables
            route_tables_list = list(self.network_client.route_tables.list(resource_group))
            route_tables = [{
                'id': rt.id,
                'name': rt.name,
                'routes': [{
                    'name': route.name,
                    'address_prefix': route.address_prefix,
                    'next_hop': route.next_hop_type
                } for route in rt.routes]
            } for rt in route_tables_list]
            
            return NetworkInfo(
                vpc_id=vnet_id,
                subnets=subnets,
                security_groups=security_groups,
                route_tables=route_tables
            )
            
        except Exception as e:
            logger.error(f"Error discovering Azure network: {e}")
            raise
    
    async def create_compute_instance(self, specs: Dict[str, Any]) -> ComputeInstance:
        """Create Azure VM"""
        # Implementation for creating Azure VM
        raise NotImplementedError("Azure VM creation pending")
    
    async def start_replication(self, source_id: str, target_specs: Dict[str, Any]) -> str:
        """Start replication using Azure Migrate"""
        raise NotImplementedError("Azure Migrate integration pending")
    
    async def get_replication_status(self, replication_id: str) -> Dict[str, Any]:
        """Get Azure Migrate replication status"""
        raise NotImplementedError("Replication status pending")
    
    async def cutover_instance(self, replication_id: str) -> ComputeInstance:
        """Perform cutover"""
        raise NotImplementedError("Cutover implementation pending")
    
    async def convert_to_container(self, instance_id: str) -> Dict[str, Any]:
        """Convert VM to container"""
        raise NotImplementedError("Container conversion pending")
    
    async def deploy_container(self, image_uri: str, specs: Dict[str, Any]) -> str:
        """Deploy to AKS"""
        raise NotImplementedError("AKS deployment pending")
    
    async def migrate_database(self, source_db: Database, target_specs: Dict[str, Any]) -> Database:
        """Migrate database to Azure SQL"""
        raise NotImplementedError("Database migration pending")
    
    async def create_serverless_function(self, code: str, runtime: str, config: Dict[str, Any]) -> str:
        """Create Azure Function"""
        raise NotImplementedError("Azure Functions pending")
    
    async def estimate_cost(self, resource_specs: Dict[str, Any]) -> Dict[str, float]:
        """Estimate Azure costs"""
        return {'compute': 0.0, 'storage': 0.0, 'network': 0.0, 'total': 0.0}
    
    async def run_validation_tests(self, resource_id: str, tests: List[str]) -> Dict[str, bool]:
        return {test: True for test in tests}
    
    async def create_snapshot(self, resource_id: str) -> str:
        """Create snapshot"""
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
    def _get_cpu_count(self, size_name: str) -> int:
        """Get CPU count for VM size"""
        cpu_map = {
            'Standard_B1s': 1, 'Standard_B2s': 2,
            'Standard_D2s_v3': 2, 'Standard_D4s_v3': 4,
            'Standard_F2s_v2': 2, 'Standard_F4s_v2': 4,
        }
        return cpu_map.get(size_name, 2)
    
    def _get_memory_gb(self, size_name: str) -> float:
        """Get memory for VM size"""
        memory_map = {
            'Standard_B1s': 1, 'Standard_B2s': 4,
            'Standard_D2s_v3': 8, 'Standard_D4s_v3': 16,
            'Standard_F2s_v2': 4, 'Standard_F4s_v2': 8,
        }
        return memory_map.get(size_name, 4.0)
    
    def _get_disk_size(self, vm) -> float:
        """Calculate total disk size"""
        total = 0
        if vm.storage_profile.os_disk.disk_size_gb:
            total += vm.storage_profile.os_disk.disk_size_gb
        for disk in vm.storage_profile.data_disks or []:
            total += disk.disk_size_gb
        return float(total)
