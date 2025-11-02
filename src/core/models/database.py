from datetime import datetime
from enum import Enum
from typing import Optional, List
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Table, Enum as SQLEnum, Integer, Float, Boolean
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid

Base = declarative_base()

class MigrationStatus(str, Enum):
    PENDING = "pending"
    DISCOVERING = "discovering"
    ANALYZING = "analyzing"
    PLANNING = "planning"
    APPROVED = "approved"
    IN_PROGRESS = "in_progress"
    VALIDATING = "validating"
    COMPLETED = "completed"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"

class MigrationStrategy(str, Enum):
    REHOST = "rehost"  # Lift and shift
    REPLATFORM = "replatform"  # Lift, tinker and shift
    REFACTOR = "refactor"  # Re-architect
    REPURCHASE = "repurchase"  # Replace with SaaS
    RETAIN = "retain"  # Keep on-prem or hybrid
    RETIRE = "retire"  # Decommission
    RELOCATE = "relocate"  # VMware to VMware cloud

class CloudProvider(str, Enum):
    AWS = "aws"
    AZURE = "azure"
    GCP = "gcp"
    ON_PREMISE = "on_premise"
    VMWARE = "vmware"
    HYBRID = "hybrid"

class AssetType(str, Enum):
    VM = "vm"
    CONTAINER = "container"
    DATABASE = "database"
    STORAGE = "storage"
    NETWORK = "network"
    APPLICATION = "application"
    SERVERLESS = "serverless"

# Association tables
asset_dependencies = Table(
    'asset_dependencies',
    Base.metadata,
    Column('source_asset_id', UUID(as_uuid=True), ForeignKey('assets.id')),
    Column('dependent_asset_id', UUID(as_uuid=True), ForeignKey('assets.id'))
)

wave_assets = Table(
    'wave_assets',
    Base.metadata,
    Column('wave_id', UUID(as_uuid=True), ForeignKey('migration_waves.id')),
    Column('asset_id', UUID(as_uuid=True), ForeignKey('assets.id'))
)

class Organization(Base):
    __tablename__ = 'organizations'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True)
    settings = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    projects = relationship("Project", back_populates="organization")
    users = relationship("User", back_populates="organization")

class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # admin, engineer, viewer
    organization_id = Column(UUID(as_uuid=True), ForeignKey('organizations.id'))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization", back_populates="users")

class Project(Base):
    __tablename__ = 'projects'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(String)
    organization_id = Column(UUID(as_uuid=True), ForeignKey('organizations.id'))
    source_provider = Column(SQLEnum(CloudProvider), nullable=False)
    target_provider = Column(SQLEnum(CloudProvider), nullable=False)
    status = Column(SQLEnum(MigrationStatus), default=MigrationStatus.PENDING)
    metadata = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    organization = relationship("Organization", back_populates="projects")
    assets = relationship("Asset", back_populates="project")
    waves = relationship("MigrationWave", back_populates="project")
    migrations = relationship("Migration", back_populates="project")

class Asset(Base):
    __tablename__ = 'assets'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey('projects.id'))
    name = Column(String, nullable=False)
    asset_type = Column(SQLEnum(AssetType), nullable=False)
    source_id = Column(String)  # Original cloud resource ID
    current_provider = Column(SQLEnum(CloudProvider), nullable=False)
    
    # Technical specifications
    specs = Column(JSON, default={})  # CPU, RAM, storage, etc.
    configuration = Column(JSON, default={})  # Cloud-specific config
    tags = Column(JSON, default={})
    
    # Discovery data
    discovered_at = Column(DateTime)
    performance_metrics = Column(JSON, default={})  # CPU/RAM utilization
    cost_data = Column(JSON, default={})  # Current and projected costs
    
    # Migration planning
    recommended_strategy = Column(SQLEnum(MigrationStrategy))
    recommendation_confidence = Column(Float)  # 0.0 to 1.0
    target_specs = Column(JSON, default={})  # Rightsized specs
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="assets")
    dependencies = relationship(
        "Asset",
        secondary=asset_dependencies,
        primaryjoin=id==asset_dependencies.c.source_asset_id,
        secondaryjoin=id==asset_dependencies.c.dependent_asset_id,
        backref="dependents"
    )
    waves = relationship("MigrationWave", secondary=wave_assets, back_populates="assets")
    migrations = relationship("Migration", back_populates="asset")

class MigrationWave(Base):
    __tablename__ = 'migration_waves'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey('projects.id'))
    name = Column(String, nullable=False)
    description = Column(String)
    wave_number = Column(Integer, nullable=False)
    
    # Scheduling
    planned_start = Column(DateTime)
    planned_end = Column(DateTime)
    actual_start = Column(DateTime)
    actual_end = Column(DateTime)
    
    # Status
    status = Column(SQLEnum(MigrationStatus), default=MigrationStatus.PENDING)
    approval_status = Column(String, default="pending")  # pending, approved, rejected
    approved_by = Column(String)
    approved_at = Column(DateTime)
    
    # Metadata
    risk_level = Column(String)  # low, medium, high, critical
    estimated_duration_hours = Column(Float)
    estimated_cost = Column(Float)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="waves")
    assets = relationship("Asset", secondary=wave_assets, back_populates="waves")
    migrations = relationship("Migration", back_populates="wave")

class Migration(Base):
    __tablename__ = 'migrations'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey('projects.id'))
    wave_id = Column(UUID(as_uuid=True), ForeignKey('migration_waves.id'))
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'))
    
    # Strategy
    strategy = Column(SQLEnum(MigrationStrategy), nullable=False)
    source_provider = Column(SQLEnum(CloudProvider), nullable=False)
    target_provider = Column(SQLEnum(CloudProvider), nullable=False)
    
    # Status tracking
    status = Column(SQLEnum(MigrationStatus), default=MigrationStatus.PENDING)
    progress_percentage = Column(Float, default=0.0)
    current_phase = Column(String)  # prepare, replicate, cutover, validate
    
    # Resources
    source_resource_id = Column(String)
    target_resource_id = Column(String)
    target_resource_url = Column(String)
    
    # Timing
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    duration_seconds = Column(Integer)
    
    # Validation
    validation_results = Column(JSON, default={})
    validation_passed = Column(Boolean)
    
    # Rollback
    rollback_available = Column(Boolean, default=True)
    rollback_point = Column(JSON, default={})
    rolled_back_at = Column(DateTime)
    
    # Costs
    actual_cost = Column(Float)
    cost_savings = Column(Float)
    
    # Logs and errors
    execution_logs = Column(JSON, default=[])
    error_message = Column(String)
    error_details = Column(JSON, default={})
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    project = relationship("Project", back_populates="migrations")
    wave = relationship("MigrationWave", back_populates="migrations")
    asset = relationship("Asset", back_populates="migrations")

class AuditLog(Base):
    __tablename__ = 'audit_logs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    action = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    resource_id = Column(UUID(as_uuid=True))
    details = Column(JSON, default={})
    ip_address = Column(String)
    user_agent = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class CostAnalysis(Base):
    __tablename__ = 'cost_analyses'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(UUID(as_uuid=True), ForeignKey('projects.id'))
    asset_id = Column(UUID(as_uuid=True), ForeignKey('assets.id'), nullable=True)
    
    # Current state
    current_monthly_cost = Column(Float)
    current_provider = Column(SQLEnum(CloudProvider))
    
    # Projected costs per provider
    aws_projected_cost = Column(Float)
    azure_projected_cost = Column(Float)
    gcp_projected_cost = Column(Float)
    
    # Savings analysis
    potential_savings = Column(Float)
    roi_months = Column(Float)  # Time to recover migration costs
    
    # Cost breakdown
    cost_breakdown = Column(JSON, default={})  # compute, storage, network, etc.
    
    analyzed_at = Column(DateTime, default=datetime.utcnow)
    valid_until = Column(DateTime)  # Pricing data expiry
