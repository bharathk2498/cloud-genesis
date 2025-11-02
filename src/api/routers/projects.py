from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel
from uuid import UUID
from src.core.models import Project, CloudProvider, MigrationStatus
from datetime import datetime

router = APIRouter()

class ProjectCreate(BaseModel):
    name: str
    description: str | None = None
    source_provider: CloudProvider
    target_provider: CloudProvider
    organization_id: UUID

class ProjectResponse(BaseModel):
    id: UUID
    name: str
    description: str | None
    source_provider: CloudProvider
    target_provider: CloudProvider
    status: MigrationStatus
    created_at: datetime
    
    class Config:
        from_attributes = True

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, db: AsyncSession = Depends()):
    """Create a new migration project"""
    db_project = Project(**project.model_dump())
    db.add(db_project)
    await db.commit()
    await db.refresh(db_project)
    return db_project

@router.get("/", response_model=List[ProjectResponse])
async def list_projects(skip: int = 0, limit: int = 100, db: AsyncSession = Depends()):
    """List all migration projects"""
    result = await db.execute(select(Project).offset(skip).limit(limit))
    projects = result.scalars().all()
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: UUID, db: AsyncSession = Depends()):
    """Get project by ID"""
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: UUID, db: AsyncSession = Depends()):
    """Delete a project"""
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await db.delete(project)
    await db.commit()
    return None
