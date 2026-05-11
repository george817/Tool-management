from typing import Optional
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.schemas.auth_schema import LoginRequest, TokenResponse, UserResponse
from app.services.auth_service import AuthService
from app.utils.security import decode_token
from app.models.user import User

router = APIRouter(prefix="/api/auth", tags=["auth"])


def get_db():
    """Dependency to get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user from token."""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication scheme",
            )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format",
        )
    
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    
    user = AuthService.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    
    return user


@router.post("/login", response_model=TokenResponse)
async def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    """
    Login endpoint. Returns JWT token and user information.
    
    - **email**: User email address
    - **password**: User password
    """
    return AuthService.login(db, login_request)


@router.post("/validate-token", response_model=UserResponse)
async def validate_token(current_user: User = Depends(get_current_user)):
    """
    Validate JWT token and return user information.
    
    - **Authorization**: Bearer token in header
    """
    return UserResponse.model_validate(current_user)


@router.get("/validate-token", response_model=UserResponse)
async def validate_token_get(current_user: User = Depends(get_current_user)):
    """Validate JWT token and return user information."""
    return UserResponse.model_validate(current_user)


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current authenticated user profile."""
    return UserResponse.model_validate(current_user)
