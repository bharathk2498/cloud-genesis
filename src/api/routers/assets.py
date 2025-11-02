from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel
from uuid import UUID
from src.core.models import Asset, AssetType, CloudProvider

router = APIRouter()

class AssetResponse(BaseModel):
    id: UUID
    name: str
    asset_type: AssetType
    current_provider: CloudProvider
    specs: dict
    tags: dict
    recommended_strategy: str | None = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[AssetResponse])
async def list_assets(
    project_id: UUID | None = None,
    asset_type: AssetType | None = None,
    db: AsyncSession = Depends()
):
    """List assets with optional filters"""
    query = select(Asset)
    
    if project_id:
        query = query.where(Asset.project_id == project_id)
    if asset_type:
        query = query.where(Asset.asset_type == asset_type)
    
    result = await db.execute(query)
    assets = result.scalars().all()
    return assets

@router.get("/{asset_id}", response_model=AssetResponse)
async def get_asset(asset_id: UUID, db: AsyncSession = Depends()):
    """Get asset by ID"""
    result = await db.execute(select(Asset).where(Asset.id == asset_id))
    asset = result.scalar_one_or_none()
    
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    return asset

@router.post("/{asset_id}/recommend-strategy")
async def recommend_strategy(asset_id: UUID, db: AsyncSession = Depends()):
    """Get AI-powered strategy recommendation for an asset"""
    result = await db.execute(select(Asset).where(Asset.id == asset_id))
    asset = result.scalar_one_or_none()
    
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Simple rule-based recommendation (would use ML model in production)
    specs = asset.specs
    
    if asset.asset_type == 'database':
        strategy = 'replatform'  # Migrate to managed DB service
        confidence = 0.85
    elif specs.get('cpu_cores', 0) < 4 and specs.get('memory_gb', 0) < 16:
        strategy = 'rehost'  # Simple lift-and-shift
        confidence = 0.9
    else:
        strategy = 'rehost'  # Default to rehost
        confidence = 0.7
    
    asset.recommended_strategy = strategy
    asset.recommendation_confidence = confidence
    await db.commit()
    
    return {
        "asset_id": asset_id,
        "recommended_strategy": strategy,
        "confidence": confidence,
        "reasoning": "Based on asset specifications and workload patterns"
    }
