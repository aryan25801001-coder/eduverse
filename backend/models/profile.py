"""
Student profile model.
Contains all editable profile fields including skills, certifications, and social links.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class StudentProfile(BaseModel):
    """Complete student profile schema with all editable fields."""
    # Personal Info
    photo: Optional[str] = None  # Base64 or URL
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    dob: Optional[str] = None

    # Academic Info
    college: Optional[str] = None
    department: Optional[str] = None
    semester: Optional[int] = None
    cgpa: Optional[float] = None

    # Skills (0-100 scale)
    programming_skills: Optional[int] = 0
    communication_skills: Optional[int] = 0
    leadership: Optional[int] = 0
    creativity: Optional[int] = 0
    logical_thinking: Optional[int] = 0

    # Additional Info
    interests: Optional[List[str]] = []
    career_goal: Optional[str] = None
    languages: Optional[List[str]] = []
    certifications: Optional[List[str]] = []
    projects: Optional[List[dict]] = []

    # Social & Resume
    github: Optional[str] = None
    linkedin: Optional[str] = None
    resume_url: Optional[str] = None

    # Metadata
    profile_completion: Optional[int] = 0
    updated_at: Optional[datetime] = None
