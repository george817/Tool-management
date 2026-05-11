from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os

from app.database.db import engine
from app.models.tool import Tool
from app.models.user import User
from app.database.db import Base
from app.routes.tool_routes import router as tool_router
from app.routes.auth import router as auth_router

logger = logging.getLogger("tool-management-api")
logging.basicConfig(level=logging.INFO)

allowed_origins_env = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173",
)
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app = FastAPI(
    title="Asset Operations Management API",
    description="Enterprise Asset Management Platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tool_router)
app.include_router(auth_router)


@app.on_event("startup")
def initialize_database():
    """Initialize database tables on service startup."""
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database initialization completed")
    except Exception as exc:
        logger.exception("Database initialization failed: %s", exc)
        # Surface failure explicitly so Render marks deploy unhealthy.
        raise


@app.get("/")
def home():
    return {
        "message": "Asset Operations Management API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "environment": os.getenv("NODE_ENV", "development")}


@app.exception_handler(Exception)
async def unhandled_exception_handler(_, exc: Exception):
    logger.exception("Unhandled server error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )
