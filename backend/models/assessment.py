"""
Assessment model.
Represents multi-section MCQ assessments with individual question/answer schemas.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class MCQQuestion(BaseModel):
    """Individual MCQ question structure."""
    id: str
    section: str
    question: str
    options: List[str]
    correct_answer: Optional[int] = None  # Index of correct option


class MCQAnswer(BaseModel):
    """Student's answer to a single MCQ."""
    question_id: str
    selected_option: int  # Index of selected option
    is_correct: Optional[bool] = None


class AssessmentSubmission(BaseModel):
    """Complete assessment submission from a student."""
    answers: List[MCQAnswer]


class AssessmentResult(BaseModel):
    """Stored assessment result in MongoDB."""
    student_email: str
    answers: List[dict]
    section_scores: dict  # e.g., {"programming": 80, "leadership": 65}
    total_score: float
    completed_at: datetime = datetime.utcnow()
    status: str = "completed"  # "in_progress" | "completed"
