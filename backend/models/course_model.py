from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    provider: str # e.g., Coursera, Udemy, YouTube
    thumbnail: str
    duration: str
    difficulty: str # Beginner, Intermediate, Advanced
    price: float = 0.0
    is_free: bool = False
    rating: float = 0.0
    skills_covered: List[str]
    target_audience: List[str] # e.g., "B.Tech", "Class 12", "Job Seeker"
    url: str
    certificate_offered: bool = False
    language: str = "English"

class CourseDB(CourseBase):
    id: str = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CourseCreate(CourseBase):
    pass

class RoadmapStep(BaseModel):
    step_number: int
    title: str
    description: str
    recommended_skills: List[str]
    courses: List[str] # List of Course IDs or placeholders

class RoadmapBase(BaseModel):
    career: str # e.g., "AI Engineer"
    description: str
    steps: List[RoadmapStep]

class RoadmapDB(RoadmapBase):
    id: str = Field(alias="_id")

class LearningPathBase(BaseModel):
    education_level: str # e.g., "Class 11", "Undergraduate"
    stream: Optional[str] # e.g., "Science", "B.Tech CSE"
    recommendations: List[str] # Topics like "Entrance Preparation", "DSA"

class LearningPathDB(LearningPathBase):
    id: str = Field(alias="_id")

class AIRecommendRequest(BaseModel):
    education_level: str
    stream: Optional[str]
    branch: Optional[str]
    semester: Optional[str]
    skills: List[str]
    career_goal: str
    preferred_language: str = "English"
    budget: str = "Free" # e.g., "Free", "Paid", "Any"
