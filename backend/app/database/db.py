from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import find_dotenv, load_dotenv
import os
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

load_dotenv(find_dotenv())

DATABASE_URL = os.getenv("DATABASE_URL")
NODE_ENV = os.getenv("NODE_ENV", "development")

if NODE_ENV == "production" and not DATABASE_URL:
    raise RuntimeError("DATABASE_URL must be set in production")

if not DATABASE_URL:
    # Local development fallback only.
    DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/tool_management"


def _ensure_ssl_for_remote_postgres(db_url: str) -> str:
    """Enforce sslmode=require for remote PostgreSQL providers like Supabase."""
    parsed = urlparse(db_url)
    if parsed.scheme not in {"postgresql", "postgresql+psycopg2"}:
        return db_url

    hostname = parsed.hostname or ""
    if hostname in {"localhost", "127.0.0.1"}:
        return db_url

    query = dict(parse_qsl(parsed.query))
    query.setdefault("sslmode", "require")
    return urlunparse(parsed._replace(query=urlencode(query)))


DATABASE_URL = _ensure_ssl_for_remote_postgres(DATABASE_URL)

# Handle SQLite-specific configuration
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=300,
        connect_args={"connect_timeout": 10},
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
from app.models.asset import Asset
from app.models.transaction import Transaction
from app.models.activity_log import ActivityLog
