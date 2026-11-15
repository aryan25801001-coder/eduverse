"""
Notification routes.
Handles notification CRUD operations with filtering and read/unread status.
"""
from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from bson import ObjectId
from database import notifications_collection
from auth import get_current_user

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])


@router.get("/")
async def get_notifications(current_user: dict = Depends(get_current_user)):
    """Retrieve all notifications for the current student, newest first."""
    cursor = notifications_collection.find(
        {"student_email": current_user["email"]}
    ).sort("created_at", -1).limit(50)

    notifications = []
    async for notif in cursor:
        notif["_id"] = str(notif["_id"])
        # Convert datetime to ISO string for JSON serialization
        if "created_at" in notif and hasattr(notif["created_at"], "isoformat"):
            notif["created_at"] = notif["created_at"].isoformat()
        notifications.append(notif)

    unread_count = await notifications_collection.count_documents({
        "student_email": current_user["email"],
        "is_read": False
    })

    return {
        "notifications": notifications,
        "unread_count": unread_count,
        "total": len(notifications)
    }


@router.put("/read/{notification_id}")
async def mark_as_read(notification_id: str, current_user: dict = Depends(get_current_user)):
    """Mark a specific notification as read."""
    result = await notifications_collection.update_one(
        {"_id": ObjectId(notification_id), "student_email": current_user["email"]},
        {"$set": {"is_read": True}}
    )
    if result.modified_count == 0:
        return {"message": "Notification not found or already read"}
    return {"message": "Notification marked as read"}


@router.put("/read-all")
async def mark_all_as_read(current_user: dict = Depends(get_current_user)):
    """Mark all notifications as read for the current student."""
    result = await notifications_collection.update_many(
        {"student_email": current_user["email"], "is_read": False},
        {"$set": {"is_read": True}}
    )
    return {"message": f"{result.modified_count} notifications marked as read"}
