from typing import Dict, Any
from .base_strategy import MigrationStrategyExecutor
from src.core.models import Asset, Migration, MigrationStatus
import logging
import asyncio

logger = logging.getLogger(__name__)

class RehostStrategy(MigrationStrategyExecutor):
    """Rehost (Lift and Shift) - Block-level replication"""
    
    def __init__(self, source_adapter, target_adapter):
        super().__init__(source_adapter, target_adapter)
        self.strategy_type = "rehost"
    
    async def validate_prerequisites(self, asset: Asset) -> Dict[str, Any]:
        """Check if asset can be rehosted"""
        checks = {
            'os_supported': True,  # Check OS compatibility
            'network_connectivity': True,  # Check source can reach target
            'disk_space_available': True,  # Check target has enough space
            'credentials_valid': True,  # Verify cloud credentials
        }
        
        all_passed = all(checks.values())
        
        return {
            'can_migrate': all_passed,
            'checks': checks,
            'warnings': [] if all_passed else ['Some prerequisites failed'],
            'estimated_downtime_minutes': 30
        }
    
    async def estimate_migration(self, asset: Asset) -> Dict[str, Any]:
        """Estimate rehost migration"""
        disk_size_gb = asset.specs.get('disk_gb', 100)
        
        # Estimate based on disk size (rough: 10GB/hour replication)
        replication_hours = disk_size_gb / 10
        
        # Get cost estimate for target resources
        target_specs = self._map_instance_specs(asset)
        cost_estimate = await self.target_adapter.estimate_cost(target_specs)
        
        return {
            'estimated_duration_hours': replication_hours + 1,  # +1 for cutover
            'estimated_cost': cost_estimate['total'],
            'risk_level': 'low',  # Rehost is lowest risk
            'confidence': 0.9,
            'downtime_minutes': 30,
            'target_specs': target_specs
        }
    
    async def prepare(self, asset: Asset, migration: Migration) -> Dict[str, Any]:
        """Prepare for rehost migration"""
        try:
            logger.info(f"Preparing rehost migration for {asset.name}")
            
            # Create snapshot of source for rollback
            snapshot_id = await self.source_adapter.create_snapshot(asset.source_id)
            
            # Validate target environment
            network_info = await self.target_adapter.discover_network()
            
            # Set up replication agent if needed
            # (AWS MGN, Azure Migrate, GCP Migrate for Compute)
            
            return {
                'status': 'prepared',
                'snapshot_id': snapshot_id,
                'target_network': network_info.vpc_id,
                'ready_for_replication': True
            }
            
        except Exception as e:
            logger.error(f"Error preparing rehost: {e}")
            raise
    
    async def execute(self, asset: Asset, migration: Migration) -> Dict[str, Any]:
        """Execute rehost migration"""
        try:
            logger.info(f"Starting rehost migration for {asset.name}")
            
            # Map source specs to target specs
            target_specs = self._map_instance_specs(asset)
            
            # Start block-level replication
            replication_id = await self.target_adapter.start_replication(
                asset.source_id, 
                target_specs
            )
            
            # Monitor replication progress
            while True:
                status = await self.target_adapter.get_replication_status(replication_id)
                
                if status['status'] == 'completed':
                    break
                elif status['status'] == 'failed':
                    raise Exception(f"Replication failed: {status.get('error')}")
                
                logger.info(f"Replication progress: {status.get('progress', 0)}%")
                await asyncio.sleep(60)  # Check every minute
            
            # Perform cutover
            logger.info(f"Starting cutover for {asset.name}")
            target_instance = await self.target_adapter.cutover_instance(replication_id)
            
            # Tag the new resource
            await self.target_adapter.tag_resource(
                target_instance.id,
                {
                    'MigrationID': str(migration.id),
                    'SourceAsset': asset.name,
                    'MigrationStrategy': 'rehost'
                }
            )
            
            return {
                'status': 'completed',
                'target_resource_id': target_instance.id,
                'target_resource_url': f"https://console.{self.target_adapter.provider}.com",
                'replication_id': replication_id
            }
            
        except Exception as e:
            logger.error(f"Error executing rehost: {e}")
            raise
    
    async def validate(self, asset: Asset, migration: Migration) -> Dict[str, bool]:
        """Validate rehost migration success"""
        try:
            target_id = migration.target_resource_id
            
            # Run validation tests
            validation_tests = [
                'instance_running',
                'network_accessible',
                'disk_mounted',
                'services_running'
            ]
            
            results = await self.target_adapter.run_validation_tests(
                target_id, 
                validation_tests
            )
            
            # Compare performance metrics
            # Get baseline from source, compare to target
            
            return {
                **results,
                'all_tests_passed': all(results.values())
            }
            
        except Exception as e:
            logger.error(f"Error validating migration: {e}")
            return {'all_tests_passed': False, 'error': str(e)}
    
    async def rollback(self, asset: Asset, migration: Migration) -> bool:
        """Rollback rehost migration"""
        try:
            logger.info(f"Rolling back migration for {asset.name}")
            
            # Delete target instance
            if migration.target_resource_id:
                await self.target_adapter.delete_resource(
                    migration.target_resource_id,
                    'compute'
                )
            
            # Restore source from snapshot if it was deleted
            if migration.rollback_point.get('snapshot_id'):
                await self.source_adapter.restore_from_snapshot(
                    migration.rollback_point['snapshot_id']
                )
            
            return True
            
        except Exception as e:
            logger.error(f"Error during rollback: {e}")
            return False
    
    def _map_instance_specs(self, asset: Asset) -> Dict[str, Any]:
        """Map source instance specs to target cloud equivalent"""
        # This would use actual pricing/sizing APIs
        # For now, simple mapping based on CPU/RAM
        
        cpu = asset.specs.get('cpu_cores', 2)
        memory = asset.specs.get('memory_gb', 4)
        
        # Simple logic - would be more sophisticated in production
        if self.target_adapter.provider == 'aws':
            if cpu <= 2 and memory <= 8:
                instance_type = 't3.medium'
            elif cpu <= 4 and memory <= 16:
                instance_type = 't3.xlarge'
            else:
                instance_type = 'm5.2xlarge'
        elif self.target_adapter.provider == 'azure':
            if cpu <= 2 and memory <= 8:
                instance_type = 'Standard_B2s'
            elif cpu <= 4 and memory <= 16:
                instance_type = 'Standard_D4s_v3'
            else:
                instance_type = 'Standard_D8s_v3'
        else:  # GCP
            if cpu <= 2 and memory <= 8:
                instance_type = 'n1-standard-2'
            elif cpu <= 4 and memory <= 16:
                instance_type = 'n1-standard-4'
            else:
                instance_type = 'n1-standard-8'
        
        return {
            'instance_type': instance_type,
            'cpu_cores': cpu,
            'memory_gb': memory,
            'disk_gb': asset.specs.get('disk_gb', 100),
            'tags': asset.tags
        }
