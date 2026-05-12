# backend/app/models/activity_log.py

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.db import Base

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    action_type = Column(String(100), nullable=False)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=True)
    performed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    target_user = Column(Integer, nullable=True)
    description = Column(Text, nullable=False)
    timestamp = Column(DateTime, server_default=func.now())

    asset = relationship("Asset", backref="activity_logs")
    actor = relationship("User", backref="activity_logs")
