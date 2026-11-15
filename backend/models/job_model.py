"""
Job and Company model for Job Recommendations
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CompanyDB(BaseModel):
    """Schema for Companies stored in DB."""
    name: str
    industry: str
    website: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None


class JobDB(BaseModel):
    """Schema for Job postings."""
    title: str
    company_name: str
    location: str
    is_remote: bool = False
    salary_range: Optional[str] = None
    required_skills: List[str] = []
    experience_level: Optional[str] = None  # Internship, Entry, Mid, Senior
    apply_url: str
    job_type: str = "Full-time"  # Full-time, Part-time, Internship, Contract
    posted_at: datetime = datetime.utcnow()
