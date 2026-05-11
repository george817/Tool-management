from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth_schema import UserCreate, UserResponse, LoginRequest, TokenResponse
from app.utils.security import verify_password, get_password_hash, create_access_token
from fastapi import HTTPException, status


class AuthService:
    @staticmethod
    def create_user(db: Session, user_create: UserCreate) -> User:
        """Create a new user."""
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_create.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_create.password)
        db_user = User(
            name=user_create.name,
            email=user_create.email,
            password_hash=hashed_password,
            role=user_create.role,
            department=user_create.department,
            is_active=user_create.is_active
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def authenticate_user(db: Session, login_request: LoginRequest) -> User:
        """Authenticate a user and return user object if valid."""
        user = db.query(User).filter(User.email == login_request.email).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User account is inactive"
            )
        
        if not verify_password(login_request.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        return user

    @staticmethod
    def login(db: Session, login_request: LoginRequest) -> TokenResponse:
        """Login a user and return token."""
        user = AuthService.authenticate_user(db, login_request)
        
        # Create token
        access_token = create_access_token(
            data={"sub": user.email, "role": user.role}
        )
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.model_validate(user)
        )

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        """Get user by email."""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        """Get user by ID."""
        return db.query(User).filter(User.id == user_id).first()
