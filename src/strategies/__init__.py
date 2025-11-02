from .base_strategy import MigrationStrategyExecutor
from .rehost import RehostStrategy
from .replatform import ReplatformStrategy
from .refactor import RefactorStrategy
from src.adapters.base import CloudAdapter

def get_strategy_executor(
    strategy: str,
    source_adapter: CloudAdapter,
    target_adapter: CloudAdapter
) -> MigrationStrategyExecutor:
    """Factory function to get strategy executor"""
    
    strategies = {
        'rehost': RehostStrategy,
        'replatform': ReplatformStrategy,
        'refactor': RefactorStrategy,
        # Additional strategies would be added:
        # 'repurchase': RepurchaseStrategy,
        # 'retain': RetainStrategy,
        # 'retire': RetireStrategy,
        # 'relocate': RelocateStrategy,
    }
    
    strategy_class = strategies.get(strategy.lower())
    if not strategy_class:
        raise ValueError(f"Unsupported migration strategy: {strategy}")
    
    return strategy_class(source_adapter, target_adapter)

__all__ = [
    'MigrationStrategyExecutor',
    'RehostStrategy',
    'ReplatformStrategy',
    'RefactorStrategy',
    'get_strategy_executor',
]
