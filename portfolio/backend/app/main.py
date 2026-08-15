from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import engine
from .models import Base
from .routes.blog import router as blog_router
from .routes.profile import router as profile_router
from .routes.skills import router as skills_router
from app.routes.contact import router as contact_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Manage application startup and shutdown resources."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    yield

    await engine.dispose()


app = FastAPI(
    title="Ambrose Abaasa Portfolio API",
    description=(
        "Portfolio and technical blog API for "
        "Ambrose Abaasa, Senior Full-Stack Software Engineer."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)
app.include_router(contact_router, prefix="/api/v1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(profile_router, prefix="/api/v1")
app.include_router(skills_router, prefix="/api/v1")
app.include_router(blog_router, prefix="/api/v1")


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    """Simple health endpoint for load balancers and monitoring."""
    return {"status": "ok"}