"""
Authentication routes.
Handles user registration, login, forgot/reset password, and logout.
"""
from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from database import users_collection, profiles_collection, notifications_collection
from models.user_model import UserRegister, UserLogin, TokenResponse, UserDB
from auth import hash_password, verify_password, create_access_token, create_reset_token, verify_reset_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse)
async def register(user: UserRegister):
    """Register a new user account with hashed password."""
    # Check if email already exists
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create user document with hashed password
    user_doc = {
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "hashed_password": hash_password(user.password),
        "country": user.country,
        "state": user.state,
        "city": user.city,
        "user_type": user.user_type,
        "education_level": user.education_level,
        "current_qualification": user.current_qualification,
        "current_year_semester": user.current_year_semester,
        "branch_stream": user.branch_stream,
        "skills": user.skills,
        "interests": user.interests,
        "languages": user.languages,
        "preferred_career": user.preferred_career,
        "resume_url": user.resume_url,
        "github": user.github,
        "linkedin": user.linkedin,
        "is_onboarded": False,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    result = await users_collection.insert_one(user_doc)

    # Create initial empty profile based on user type
    profile_doc = {
        "user_email": user.email,
        "name": user.name,
        "email": user.email,
        "user_type": user.user_type,
        "photo": None,
        "phone": user.phone,
        "gender": None,
        "dob": None,
        # Profile metrics
        "programming_skills": 0,
        "communication_skills": 0,
        "leadership": 0,
        "creativity": 0,
        "logical_thinking": 0,
        "projects": [],
        "certifications": [],
        "profile_completion": 10,
        "updated_at": datetime.now(timezone.utc),
    }
    await profiles_collection.insert_one(profile_doc)

    # Create welcome notification
    welcome_notif = {
        "user_email": user.email,
        "type": "career_alert",
        "title": "Welcome to the AI Career Platform! 🎉",
        "message": "Your account has been created successfully. Complete your profile to get personalized AI career guidance.",
        "is_read": False,
        "created_at": datetime.now(timezone.utc),
    }
    await notifications_collection.insert_one(welcome_notif)

    # Generate JWT token
    access_token = create_access_token(data={"sub": user.email})

    return TokenResponse(
        access_token=access_token,
        user={
            "id": str(result.inserted_id),
            "name": user.name,
            "email": user.email,
            "user_type": user.user_type,
            "is_onboarded": False,
        }
    )


@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    """Authenticate user with email/password and return JWT token."""
    user = await users_collection.find_one({"email": credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate JWT token
    access_token = create_access_token(data={"sub": credentials.email})

    return TokenResponse(
        access_token=access_token,
        user={
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "user_type": user.get("user_type", "Student"),
            "is_onboarded": user.get("is_onboarded", False),
        }
    )


from pydantic import BaseModel, EmailStr

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Generate a password reset token (in production, this would send an email)."""
    user = await users_collection.find_one({"email": request.email})
    if not user:
        # Return success even if email not found (security best practice)
        return {"message": "If the email exists, a reset link has been sent."}

    reset_token = create_reset_token(request.email)

    return {
        "message": "Password reset link has been sent to your email.",
        "reset_token": reset_token
    }


@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Reset password using a valid reset token."""
    email = verify_reset_token(request.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )

    # Update password
    hashed = hash_password(request.new_password)
    result = await users_collection.update_one(
        {"email": email},
        {"$set": {"hashed_password": hashed, "updated_at": datetime.now(timezone.utc)}}
    )

    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {"message": "Password has been reset successfully."}


@router.post("/logout")
async def logout():
    """Client-side logout"""
    return {"message": "Logged out successfully. Please discard your token."}
