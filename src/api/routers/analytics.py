from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from uuid import UUID
from src.core.models import Asset, Migration, MigrationStatus, MigrationStrategy
from typing import Dict, Any

router = APIRouter()

@router.get("/project/{project_id}/overview")
async def get_project_overview(project_id: UUID, db: AsyncSession = Depends()) -> Dict[str, Any]:
    """Get project analytics overview"""
    
    # Total assets
    total_assets = await db.execute(
        select(func.count(Asset.id)).where(Asset.project_id == project_id)
    )
    total = total_assets.scalar()
    
    # Assets by type
    assets_by_type = await db.execute(
        select(Asset.asset_type, func.count(Asset.id))
        .where(Asset.project_id == project_id)
        .group_by(Asset.asset_type)
    )
    
    # Migration status breakdown
    migrations_by_status = await db.execute(
        select(Migration.status, func.count(Migration.id))
        .where(Migration.project_id == project_id)
        .group_by(Migration.status)
    )
    
    # Strategy distribution
    strategy_distribution = await db.execute(
        select(Migration.strategy, func.count(Migration.id))
        .where(Migration.project_id == project_id)
        .group_by(Migration.strategy)
    )
    
    return {
        "total_assets": total,
        "assets_by_type": {row[0].value: row[1] for row in assets_by_type},
        "migrations_by_status": {row[0].value: row[1] for row in migrations_by_status},
        "strategy_distribution": {row[0].value: row[1] for row in strategy_distribution},
    }

@router.get("/project/{project_id}/cost-analysis")
async def get_cost_analysis(project_id: UUID, db: AsyncSession = Depends()):
    """Get cost analysis for project"""
    # Would calculate actual costs based on assets and migrations
    return {
        "current_monthly_cost": 15000.0,
        "projected_monthly_cost": 12000.0,
        "potential_savings": 3000.0,
        "roi_months": 8.5,
        "cost_breakdown": {
            "compute": 8000.0,
            "storage": 3000.0,
            "network": 2000.0,
            "database": 2000.0
        }
    }

@router.get("/project/{project_id}/timeline")
async def get_migration_timeline(project_id: UUID, db: AsyncSession = Depends()):
    """Get migration timeline"""
    return {
        "total_estimated_duration_days": 45,
        "completed_migrations": 12,
        "in_progress_migrations": 5,
        "pending_migrations": 23,
        "milestones": [
            {"date": "2025-01-15", "event": "Discovery Complete", "status": "completed"},
            {"date": "2025-02-01", "event": "Wave 1 Start", "status": "in_progress"},
            {"date": "2025-03-15", "event": "Wave 2 Start", "status": "pending"},
        ]
    }
