from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from src.core.models import Base
from src.api.routers import projects, assets, migrations, discovery, analytics
import logging
from contextlib import asynccontextmanager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database setup
DATABASE_URL = "postgresql+asyncpg://cloudgenesis:dev_password@localhost:5432/migration_db"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Cloud Genesis API")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    logger.info("Shutting down Cloud Genesis API")
    await engine.dispose()

# Create FastAPI app
app = FastAPI(
    title="Cloud Genesis API",
    description="Enterprise Multi-Cloud Migration Platform",
    version="2.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "2.0.0"}

# Include routers
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(assets.router, prefix="/api/v1/assets", tags=["assets"])
app.include_router(migrations.router, prefix="/api/v1/migrations", tags=["migrations"])
app.include_router(discovery.router, prefix="/api/v1/discovery", tags=["discovery"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["analytics"])

# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal error occurred"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
