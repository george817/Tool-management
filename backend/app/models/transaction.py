# backend/app/models/transaction.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    issued_to = Column(Integer, ForeignKey("users.id"), nullable=False)
    issued_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    issue_time = Column(DateTime, server_default=func.now())
    expected_return = Column(DateTime, nullable=False)
    return_time = Column(DateTime, nullable=True)
    status = Column(String(50), nullable=False, default="active")
    condition_on_return = Column(String(50), nullable=True)
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    asset = relationship("Asset", backref="transactions")
    receiver = relationship("User", foreign_keys=[issued_to], backref="received_assets")
    issuer = relationship("User", foreign_keys=[issued_by], backref="issued_assets")
