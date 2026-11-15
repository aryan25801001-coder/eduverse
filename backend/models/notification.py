"""
Notification model.
Supports categorized notifications with read/unread status tracking.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Notification(BaseModel):
    """Individual notification entry."""
    student_email: str
    type: str  # "assessment_reminder" | "skill_improvement" | "new_course" | "career_alert"
    title: str
    message: str
    is_read: bool = False
    created_at: datetime = datetime.utcnow()


class NotificationUpdate(BaseModel):
    """Schema for updating notification read status."""
    notification_id: str
    is_read: bool = True
