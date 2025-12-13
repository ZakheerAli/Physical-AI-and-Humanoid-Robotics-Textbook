from typing import Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

from backend.models.user import User

auth_router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Optional[str] = "student"


class AuthResponse(BaseModel):
    message: str
    access_token: Optional[str] = None
    token_type: Optional[str] = "bearer"


@auth_router.post(
    "/register",
    response_model=AuthResponse,
    summary="Register a new user",
    description="Registers a new user with a unique username and email, returning a mock access token upon success.",
)
async def register_user(request: RegisterRequest):
    # In a real application, you would:
    # 1. Check if username or email already exists in the database
    # 2. Hash the password (using passlib or bcrypt)
    # 3. Store the new user in the database
    # 4. Generate a JWT token for the new user

    # For now, a mock implementation
    if request.email == "test@example.com" or request.username == "testuser":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Username or email already registered"
        )

    # Mock password hashing (DO NOT USE IN PRODUCTION)
    mock_password_hash = f"hashed_{request.password}"

    new_user = User(
        username=request.username,
        email=request.email,
        password_hash=mock_password_hash,
        role=request.role,
    )

    # Mock token generation
    mock_access_token = f"mock_token_for_{new_user.username}"

    return AuthResponse(message="User registered successfully", access_token=mock_access_token)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(...)


@auth_router.post(
    "/login",
    response_model=AuthResponse,
    summary="Authenticate a user",
    description="Authenticates an existing user with email and password, returning a mock access token upon success.",
)
async def login_user(request: LoginRequest):
    # In a real application, you would:
    # 1. Retrieve the user from the database by email
    # 2. Verify the provided password against the stored hashed password
    # 3. Generate a JWT token upon successful authentication

    # For now, a mock implementation
    if request.email == "user@example.com" and request.password == "password":
        mock_access_token = f"mock_token_for_{request.email}"
        return AuthResponse(message="Logged in successfully", access_token=mock_access_token)
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
