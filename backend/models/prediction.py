"""
Career prediction and learning persona models.
Contains schemas for AI-generated career predictions and learning persona analysis.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CareerItem(BaseModel):
    """Individual career prediction entry."""
    title: str
    prediction_percentage: float
    salary_range: str
    required_skills: List[str]
    job_description: str
    roadmap: List[str]
    recommended_certifications: List[str]
    recommended_courses: List[str]


class CareerPrediction(BaseModel):
    """Complete career prediction result for a student."""
    student_email: str
    top_careers: List[CareerItem]
    confidence_score: float
    generated_at: datetime = datetime.utcnow()


class LearningPersona(BaseModel):
    """Learning persona analysis result."""
    student_email: str
    persona_name: str
    description: str
    strengths: List[str]
    weaknesses: List[str]
    recommended_learning_strategy: str
    best_study_methods: List[str]
    career_suitability: List[str]
    progress_score: float
    confidence_percentage: float
    generated_at: datetime = datetime.utcnow()
