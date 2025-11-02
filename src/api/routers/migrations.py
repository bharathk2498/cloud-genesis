from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel
from uuid import UUID
from src.core.models import Migration, Asset, MigrationStrategy, MigrationStatus
from src.adapters import get_adapter, CloudCredentials
from src.strategies import get_strategy_executor
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class MigrationCreate(BaseModel):
    asset_id: UUID
    strategy: MigrationStrategy
    wave_id: UUID | None = None
    source_credentials: dict
    target_credentials: dict

class MigrationResponse(BaseModel):
    id: UUID
    asset_id: UUID
    strategy: MigrationStrategy
    status: MigrationStatus
    progress_percentage: float
    
    class Config:
        from_attributes = True

async def execute_migration_job(
    migration_id: UUID,
    asset_id: UUID,
    strategy: MigrationStrategy,
    source_creds: dict,
    target_creds: dict,
    db: AsyncSession
):
    """Background task to execute migration"""
    try:
        logger.info(f"Starting migration {migration_id}")
        
        # Get asset and migration
        asset_result = await db.execute(select(Asset).where(Asset.id == asset_id))
        asset = asset_result.scalar_one()
        
        migration_result = await db.execute(select(Migration).where(Migration.id == migration_id))
        migration = migration_result.scalar_one()
        
        # Initialize adapters
        source_adapter = get_adapter(CloudCredentials(**source_creds))
        target_adapter = get_adapter(CloudCredentials(**target_creds))
        
        # Get strategy executor
        strategy_executor = get_strategy_executor(
            strategy.value,
            source_adapter,
            target_adapter
        )
        
        # Execute migration phases
        migration.status = MigrationStatus.IN_PROGRESS
        migration.current_phase = "prepare"
        await db.commit()
        
        # Prepare
        prep_result = await strategy_executor.prepare(asset, migration)
        migration.rollback_point = prep_result
        await db.commit()
        
        # Execute
        migration.current_phase = "execute"
        await db.commit()
        exec_result = await strategy_executor.execute(asset, migration)
        
        migration.target_resource_id = exec_result.get('target_resource_id')
        migration.target_resource_url = exec_result.get('target_resource_url')
        await db.commit()
        
        # Validate
        migration.current_phase = "validate"
        await db.commit()
        validation_results = await strategy_executor.validate(asset, migration)
        
        migration.validation_results = validation_results
        migration.validation_passed = validation_results.get('all_tests_passed', False)
        
        if migration.validation_passed:
            migration.status = MigrationStatus.COMPLETED
            migration.progress_percentage = 100.0
        else:
            migration.status = MigrationStatus.FAILED
            # Optionally trigger rollback
        
        await db.commit()
        logger.info(f"Migration {migration_id} completed successfully")
        
    except Exception as e:
        logger.error(f"Migration {migration_id} failed: {e}", exc_info=True)
        migration_result = await db.execute(select(Migration).where(Migration.id == migration_id))
        migration = migration_result.scalar_one()
        migration.status = MigrationStatus.FAILED
        migration.error_message = str(e)
        await db.commit()

@router.post("/", response_model=MigrationResponse, status_code=201)
async def create_migration(
    request: MigrationCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends()
):
    """Create and start a migration"""
    # Get asset
    result = await db.execute(select(Asset).where(Asset.id == request.asset_id))
    asset = result.scalar_one_or_none()
    
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Create migration record
    migration = Migration(
        project_id=asset.project_id,
        asset_id=request.asset_id,
        wave_id=request.wave_id,
        strategy=request.strategy,
        source_provider=asset.current_provider,
        target_provider=asset.project.target_provider,
        status=MigrationStatus.PENDING
    )
    
    db.add(migration)
    await db.commit()
    await db.refresh(migration)
    
    # Start migration in background
    background_tasks.add_task(
        execute_migration_job,
        migration.id,
        request.asset_id,
        request.strategy,
        request.source_credentials,
        request.target_credentials,
        db
    )
    
    return migration

@router.get("/", response_model=List[MigrationResponse])
async def list_migrations(project_id: UUID | None = None, db: AsyncSession = Depends()):
    """List migrations"""
    query = select(Migration)
    if project_id:
        query = query.where(Migration.project_id == project_id)
    
    result = await db.execute(query)
    migrations = result.scalars().all()
    return migrations

@router.get("/{migration_id}", response_model=MigrationResponse)
async def get_migration(migration_id: UUID, db: AsyncSession = Depends()):
    """Get migration by ID"""
    result = await db.execute(select(Migration).where(Migration.id == migration_id))
    migration = result.scalar_one_or_none()
    
    if not migration:
        raise HTTPException(status_code=404, detail="Migration not found")
    
    return migration

@router.post("/{migration_id}/rollback")
async def rollback_migration(migration_id: UUID, db: AsyncSession = Depends()):
    """Rollback a migration"""
    result = await db.execute(select(Migration).where(Migration.id == migration_id))
    migration = result.scalar_one_or_none()
    
    if not migration:
        raise HTTPException(status_code=404, detail="Migration not found")
    
    if not migration.rollback_available:
        raise HTTPException(status_code=400, detail="Rollback not available for this migration")
    
    # Would trigger actual rollback job
    migration.status = MigrationStatus.ROLLED_BACK
    await db.commit()
    
    return {"message": "Rollback initiated"}
