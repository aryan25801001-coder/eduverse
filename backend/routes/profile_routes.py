"""
Profile routes.
Handles student profile CRUD operations (protected by JWT).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timezone
from database import profiles_collection
from models.profile import StudentProfile
from auth import get_current_user

router = APIRouter(prefix="/api/profile", tags=["Profile"])


def calculate_profile_completion(profile: dict) -> int:
    """Calculate profile completion percentage based on filled fields."""
    fields = [
        "name", "email", "phone", "gender", "dob",
        "college", "department", "semester", "cgpa",
        "career_goal", "github", "linkedin"
    ]
    list_fields = ["interests", "languages", "certifications", "projects"]
    skill_fields = ["programming_skills", "communication_skills", "leadership", "creativity", "logical_thinking"]

    total = len(fields) + len(list_fields) + len(skill_fields)
    filled = 0

    for f in fields:
        if profile.get(f):
            filled += 1
    for f in list_fields:
        if profile.get(f) and len(profile[f]) > 0:
            filled += 1
    for f in skill_fields:
        if profile.get(f) and profile[f] > 0:
            filled += 1

    if profile.get("photo"):
        filled += 1
        total += 1
    else:
        total += 1

    return int((filled / total) * 100)


@router.get("/")
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Retrieve the current student's full profile."""
    profile = await profiles_collection.find_one(
        {"student_email": current_user["email"]},
        {"_id": 0}  # Exclude MongoDB _id
    )
    if not profile:
        # Create a default profile if not found
        profile = {
            "student_email": current_user["email"],
            "name": current_user.get("name", ""),
            "email": current_user["email"],
            "profile_completion": 10,
        }
        await profiles_collection.insert_one(profile)
        profile.pop("_id", None)

    return profile


@router.put("/")
async def update_profile(
    profile_data: StudentProfile,
    current_user: dict = Depends(get_current_user)
):
    """Update the current student's profile."""
    update_dict = profile_data.model_dump(exclude_none=True)
    update_dict["updated_at"] = datetime.now(timezone.utc)

    # Recalculate profile completion
    existing = await profiles_collection.find_one({"student_email": current_user["email"]})
    if existing:
        merged = {**existing, **update_dict}
        update_dict["profile_completion"] = calculate_profile_completion(merged)

    result = await profiles_collection.update_one(
        {"student_email": current_user["email"]},
        {"$set": update_dict},
        upsert=True
    )

    updated_profile = await profiles_collection.find_one(
        {"student_email": current_user["email"]},
        {"_id": 0}
    )

    return {"message": "Profile updated successfully", "profile": updated_profile}
