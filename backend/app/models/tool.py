from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    tool_name = Column(String, nullable=False)
    tool_code = Column(String, unique=True, nullable=False)
    category = Column(String)
    quantity = Column(Integer, default=1)
    status = Column(String, default="Available")
    location = Column(String)
    condition = Column(String, default="Good")
