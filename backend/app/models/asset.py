# backend/app/models/asset.py

from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from . import Base  # Import Base from same package

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    asset_name = Column(String(200), nullable=False)
    asset_code = Column(String(100), unique=True, nullable=False, index=True)
    asset_type = Column(String(100), nullable=False)
    category = Column(String(100), nullable=True)
    status = Column(String(50), nullable=False, default="available")
    condition = Column(String(50), nullable=False, default="operational")
    location = Column(String(200), nullable=True)
    quantity = Column(Integer, nullable=False, default=1)
    serial_number = Column(String(150), nullable=True)
    purchase_date = Column(DateTime, nullable=True)
    last_maintenance = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
