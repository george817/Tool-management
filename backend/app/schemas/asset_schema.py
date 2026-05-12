# backend/app/schemas/asset_schema.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AssetCreate(BaseModel):
    asset_name: str
    asset_code: str
    asset_type: str
    category: Optional[str] = None
    status: str = "available"
    condition: str = "operational"
    location: Optional[str] = None
    quantity: int = 1
    serial_number: Optional[str] = None
    purchase_date: Optional[datetime] = None

class AssetUpdate(BaseModel):
    asset_name: Optional[str] = None
    status: Optional[str] = None
    condition: Optional[str] = None
    location: Optional[str] = None
    quantity: Optional[int] = None
    last_maintenance: Optional[datetime] = None

class AssetResponse(BaseModel):
    id: int
    asset_name: str
    asset_code: str
    asset_type: str
    category: Optional[str]
    status: str
    condition: str
    location: Optional[str]
    quantity: int
    serial_number: Optional[str]
    purchase_date: Optional[datetime]
    last_maintenance: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True   # Pydantic v2 compatibility
