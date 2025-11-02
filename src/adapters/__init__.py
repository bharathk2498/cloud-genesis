from .base import CloudAdapter, CloudCredentials, ComputeInstance, Database, StorageBucket
from .aws_adapter import AWSAdapter
from .azure_adapter import AzureAdapter
from .gcp_adapter import GCPAdapter

def get_adapter(credentials: CloudCredentials) -> CloudAdapter:
    """Factory function to get the appropriate cloud adapter"""
    adapters = {
        'aws': AWSAdapter,
        'azure': AzureAdapter,
        'gcp': GCPAdapter,
    }
    
    adapter_class = adapters.get(credentials.provider.lower())
    if not adapter_class:
        raise ValueError(f"Unsupported cloud provider: {credentials.provider}")
    
    return adapter_class(credentials)

__all__ = [
    'CloudAdapter',
    'CloudCredentials',
    'ComputeInstance',
    'Database',
    'StorageBucket',
    'AWSAdapter',
    'AzureAdapter',
    'GCPAdapter',
    'get_adapter',
]
