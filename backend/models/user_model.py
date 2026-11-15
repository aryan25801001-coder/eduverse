"""
User authentication and profile models.
Handles registration for all user types: School Student, Diploma, UG, PG, Graduate, Working Professional.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class UserRegister(BaseModel):
    """Schema for new user registration."""
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    user_type: str  # e.g., "School Student", "Undergraduate Student", "Working Professional"
    
    # Education / Professional fields
    education_level: Optional[str] = None
    current_qualification: Optional[str] = None
    current_year_semester: Optional[str] = None
    branch_stream: Optional[str] = None
    
    # Skills and Preferences
    skills: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    languages: Optional[List[str]] = []
    preferred_career: Optional[str] = None

    # Links
    resume_url: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None


class UserLogin(BaseModel):
    """Schema for user login credentials."""
    email: EmailStr
    password: str
    remember_me: bool = False


class TokenResponse(BaseModel):
    """JWT token response returned after successful authentication."""
    access_token: str
    token_type: str = "bearer"
    user: dict


class UserDB(BaseModel):
    """Internal user representation stored in MongoDB."""
    name: str
    email: str
    phone: Optional[str] = None
    hashed_password: str
    
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    user_type: str
    
    education_level: Optional[str] = None
    current_qualification: Optional[str] = None
    current_year_semester: Optional[str] = None
    branch_stream: Optional[str] = None
    
    skills: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    languages: Optional[List[str]] = []
    preferred_career: Optional[str] = None
    
    resume_url: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    
    is_onboarded: bool = False
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
