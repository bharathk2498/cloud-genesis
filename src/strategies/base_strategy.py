from abc import ABC, abstractmethod
from typing import Dict, Any, List
from src.core.models import Asset, Migration, MigrationStrategy
from src.adapters.base import CloudAdapter
import logging

logger = logging.getLogger(__name__)

class MigrationStrategyExecutor(ABC):
    """Base class for migration strategy executors"""
    
    def __init__(self, source_adapter: CloudAdapter, target_adapter: CloudAdapter):
        self.source_adapter = source_adapter
        self.target_adapter = target_adapter
        self.strategy_type = None
    
    @abstractmethod
    async def validate_prerequisites(self, asset: Asset) -> Dict[str, Any]:
        """Validate that the asset can be migrated with this strategy"""
        pass
    
    @abstractmethod
    async def estimate_migration(self, asset: Asset) -> Dict[str, Any]:
        """Estimate time, cost, and complexity for this migration"""
        pass
    
    @abstractmethod
    async def prepare(self, asset: Asset, migration: Migration) -> Dict[str, Any]:
        """Prepare for migration (create snapshots, backups, etc.)"""
        pass
    
    @abstractmethod
    async def execute(self, asset: Asset, migration: Migration) -> Dict[str, Any]:
        """Execute the migration"""
        pass
    
    @abstractmethod
    async def validate(self, asset: Asset, migration: Migration) -> Dict[str, bool]:
        """Validate migration success"""
        pass
    
    @abstractmethod
    async def rollback(self, asset: Asset, migration: Migration) -> bool:
        """Rollback migration if needed"""
        pass
    
    async def cleanup(self, asset: Asset, migration: Migration) -> bool:
        """Cleanup source resources after successful migration"""
        try:
            logger.info(f"Cleaning up source resources for {asset.name}")
            # Decommission source
            # Remove temporary resources
            return True
        except Exception as e:
            logger.error(f"Error during cleanup: {e}")
            return False
