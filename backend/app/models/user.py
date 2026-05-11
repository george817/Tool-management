from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from datetime import datetime
import enum
from app.database.db import Base


class RoleEnum(str, enum.Enum):
    OPERATOR = "operator"
    MANAGER = "manager"
    DIRECTOR = "director"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False, default=RoleEnum.OPERATOR)
    department = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
