"""
Scholarship and Hackathon model
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ScholarshipDB(BaseModel):
    """Schema for Scholarships."""
    title: str
    provider: str
    amount: Optional[str] = None
    deadline: Optional[datetime] = None
    eligibility_criteria: List[str] = []
    apply_url: str
    created_at: datetime = datetime.utcnow()


class HackathonDB(BaseModel):
    """Schema for Hackathons."""
    title: str
    organizer: str
    mode: str = "Online"  # Online, Offline, Hybrid
    location: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    prize_pool: Optional[str] = None
    apply_url: str
    created_at: datetime = datetime.utcnow()
