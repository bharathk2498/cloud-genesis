from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from uuid import UUID
from typing import Dict, Any
from src.adapters import get_adapter, CloudCredentials
from src.core.models import Project, Asset, CloudProvider, AssetType
from sqlalchemy import select
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class DiscoveryRequest(BaseModel):
    project_id: UUID
    credentials: Dict[str, Any]
    
class DiscoveryResponse(BaseModel):
    job_id: str
    status: str
    message: str

async def run_discovery_job(project_id: UUID, credentials: Dict[str, Any], db: AsyncSession):
    """Background task to run discovery"""
    try:
        logger.info(f"Starting discovery for project {project_id}")
        
        # Get project
        result = await db.execute(select(Project).where(Project.id == project_id))
        project = result.scalar_one_or_none()
        
        if not project:
            logger.error(f"Project {project_id} not found")
            return
        
        # Initialize cloud adapter
        cloud_creds = CloudCredentials(
            provider=project.source_provider,
            credentials=credentials,
            region=credentials.get('region', 'us-east-1')
        )
        adapter = get_adapter(cloud_creds)
        
        # Discover compute instances
        logger.info("Discovering compute instances...")
        instances = await adapter.discover_compute_instances()
        for instance in instances:
            asset = Asset(
                project_id=project_id,
                name=instance.name,
                asset_type=AssetType.VM,
                source_id=instance.id,
                current_provider=project.source_provider,
                specs={
                    'cpu_cores': instance.cpu_cores,
                    'memory_gb': instance.memory_gb,
                    'disk_gb': instance.disk_gb,
                    'instance_type': instance.instance_type,
                },
                tags=instance.tags,
                configuration=instance.metadata
            )
            db.add(asset)
        
        # Discover databases
        logger.info("Discovering databases...")
        databases = await adapter.discover_databases()
        for database in databases:
            asset = Asset(
                project_id=project_id,
                name=database.name,
                asset_type=AssetType.DATABASE,
                source_id=database.id,
                current_provider=project.source_provider,
                specs={
                    'engine': database.engine,
                    'engine_version': database.engine_version,
                    'instance_class': database.instance_class,
                    'storage_gb': database.storage_gb,
                },
                tags=database.tags
            )
            db.add(asset)
        
        # Discover storage
        logger.info("Discovering storage...")
        buckets = await adapter.discover_storage()
        for bucket in buckets:
            asset = Asset(
                project_id=project_id,
                name=bucket.name,
                asset_type=AssetType.STORAGE,
                source_id=bucket.id,
                current_provider=project.source_provider,
                specs={
                    'size_gb': bucket.size_gb,
                    'object_count': bucket.object_count,
                    'storage_class': bucket.storage_class,
                },
                tags=bucket.tags
            )
            db.add(asset)
        
        await db.commit()
        logger.info(f"Discovery completed for project {project_id}")
        
    except Exception as e:
        logger.error(f"Discovery failed: {e}", exc_info=True)
        raise

@router.post("/", response_model=DiscoveryResponse)
async def start_discovery(
    request: DiscoveryRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends()
):
    """Start cloud resource discovery"""
    job_id = f"discovery-{request.project_id}"
    
    # Add background task
    background_tasks.add_task(
        run_discovery_job,
        request.project_id,
        request.credentials,
        db
    )
    
    return DiscoveryResponse(
        job_id=job_id,
        status="started",
        message="Discovery job started"
    )

@router.get("/status/{job_id}")
async def get_discovery_status(job_id: str):
    """Get discovery job status"""
    # Would check actual job status from queue/database
    return {
        "job_id": job_id,
        "status": "completed",
        "progress": 100
    }
