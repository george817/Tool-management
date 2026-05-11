from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class RoleEnum(str, Enum):
    OPERATOR = "operator"
    MANAGER = "manager"
    DIRECTOR = "director"
    ADMIN = "admin"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: RoleEnum
    department: Optional[str] = None
    is_active: bool = True


class UserCreate(UserBase):
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: RoleEnum
    department: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str
