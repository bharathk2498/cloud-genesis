from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from enum import Enum

@dataclass
class CloudCredentials:
    provider: str
    credentials: Dict[str, Any]
    region: str

@dataclass
class ComputeInstance:
    id: str
    name: str
    instance_type: str
    cpu_cores: int
    memory_gb: float
    disk_gb: float
    state: str
    private_ip: Optional[str] = None
    public_ip: Optional[str] = None
    tags: Dict[str, str] = None
    metadata: Dict[str, Any] = None

@dataclass
class Database:
    id: str
    name: str
    engine: str
    engine_version: str
    instance_class: str
    storage_gb: int
    state: str
    endpoint: Optional[str] = None
    port: Optional[int] = None
    multi_az: bool = False
    tags: Dict[str, str] = None

@dataclass
class StorageBucket:
    id: str
    name: str
    size_gb: float
    object_count: int
    storage_class: str
    region: str
    tags: Dict[str, str] = None

@dataclass
class NetworkInfo:
    vpc_id: str
    subnets: List[Dict[str, Any]]
    security_groups: List[Dict[str, Any]]
    route_tables: List[Dict[str, Any]]

class CloudAdapter(ABC):
    """Base class for cloud provider adapters"""
    
    def __init__(self, credentials: CloudCredentials):
        self.credentials = credentials
        self.provider = credentials.provider
        self.region = credentials.region
    
    # Discovery methods
    @abstractmethod
    async def discover_compute_instances(self) -> List[ComputeInstance]:
        """Discover all compute instances (VMs/EC2/Compute Engine)"""
        pass
    
    @abstractmethod
    async def discover_databases(self) -> List[Database]:
        """Discover all managed databases"""
        pass
    
    @abstractmethod
    async def discover_storage(self) -> List[StorageBucket]:
        """Discover all storage buckets/containers"""
        pass
    
    @abstractmethod
    async def discover_network(self) -> NetworkInfo:
        """Discover network topology"""
        pass
    
    # Migration methods - Rehost
    @abstractmethod
    async def create_compute_instance(self, specs: Dict[str, Any]) -> ComputeInstance:
        """Create a new compute instance"""
        pass
    
    @abstractmethod
    async def start_replication(self, source_id: str, target_specs: Dict[str, Any]) -> str:
        """Start block-level replication for rehost migration"""
        pass
    
    @abstractmethod
    async def get_replication_status(self, replication_id: str) -> Dict[str, Any]:
        """Get status of ongoing replication"""
        pass
    
    @abstractmethod
    async def cutover_instance(self, replication_id: str) -> ComputeInstance:
        """Perform cutover from source to target"""
        pass
    
    # Migration methods - Replatform
    @abstractmethod
    async def convert_to_container(self, instance_id: str) -> Dict[str, Any]:
        """Convert VM to container image"""
        pass
    
    @abstractmethod
    async def deploy_container(self, image_uri: str, specs: Dict[str, Any]) -> str:
        """Deploy containerized application"""
        pass
    
    @abstractmethod
    async def migrate_database(self, source_db: Database, target_specs: Dict[str, Any]) -> Database:
        """Migrate database with schema conversion if needed"""
        pass
    
    # Migration methods - Refactor
    @abstractmethod
    async def create_serverless_function(self, code: str, runtime: str, config: Dict[str, Any]) -> str:
        """Deploy code as serverless function"""
        pass
    
    # Cost estimation
    @abstractmethod
    async def estimate_cost(self, resource_specs: Dict[str, Any]) -> Dict[str, float]:
        """Estimate monthly cost for resources"""
        pass
    
    # Validation
    @abstractmethod
    async def run_validation_tests(self, resource_id: str, tests: List[str]) -> Dict[str, bool]:
        """Run post-migration validation tests"""
        pass
    
    # Rollback
    @abstractmethod
    async def create_snapshot(self, resource_id: str) -> str:
        """Create snapshot/backup for rollback"""
        pass
    
    @abstractmethod
    async def restore_from_snapshot(self, snapshot_id: str) -> str:
        """Restore resource from snapshot"""
        pass
    
    # Resource management
    @abstractmethod
    async def delete_resource(self, resource_id: str, resource_type: str) -> bool:
        """Delete a cloud resource"""
        pass
    
    @abstractmethod
    async def tag_resource(self, resource_id: str, tags: Dict[str, str]) -> bool:
        """Add tags to a resource"""
        pass
    
    # Monitoring
    @abstractmethod
    async def get_metrics(self, resource_id: str, metric_names: List[str], 
                         start_time: str, end_time: str) -> Dict[str, List[float]]:
        """Get performance metrics for a resource"""
        pass
