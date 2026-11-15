from fastapi import APIRouter, HTTPException
from typing import List, Optional
import os
import google.generativeai as genai
import json
from ..database import db
from ..models.course_model import CourseDB, AIRecommendRequest, RoadmapDB, LearningPathDB

course_router = APIRouter(prefix="/api/courses", tags=["Courses"])

# Initialize Gemini AI
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@course_router.get("/", response_model=List[CourseDB])
async def get_courses(
    category: Optional[str] = None,
    provider: Optional[str] = None,
    difficulty: Optional[str] = None,
    is_free: Optional[bool] = None,
    limit: int = 50,
    skip: int = 0
):
    """Fetch paginated courses with optional filters."""
    query = {}
    if category:
        query["skills_covered"] = {"$regex": category, "$options": "i"}
    if provider:
        query["provider"] = provider
    if difficulty:
        query["difficulty"] = difficulty
    if is_free is not None:
        query["is_free"] = is_free

    courses = await db.courses.find(query).skip(skip).limit(limit).to_list(length=limit)
    for c in courses:
        c["_id"] = str(c["_id"])
    return courses

@course_router.get("/roadmaps/{career}", response_model=RoadmapDB)
async def get_roadmap(career: str):
    """Fetch a career roadmap."""
    roadmap = await db.roadmaps.find_one({"career": {"$regex": f"^{career}$", "$options": "i"}})
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    roadmap["_id"] = str(roadmap["_id"])
    return roadmap

@course_router.get("/learning-paths", response_model=List[LearningPathDB])
async def get_learning_paths(education_level: str, stream: Optional[str] = None):
    """Fetch learning paths based on education level and stream."""
    query = {"education_level": {"$regex": f"^{education_level}$", "$options": "i"}}
    if stream:
        query["stream"] = {"$regex": f"^{stream}$", "$options": "i"}
        
    paths = await db.learning_paths.find(query).to_list(length=10)
    for p in paths:
        p["_id"] = str(p["_id"])
    return paths

@course_router.post("/recommend")
async def recommend_courses(request: AIRecommendRequest):
    """Use Gemini AI to recommend courses based on user profile."""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    prompt = f"""
    You are an expert AI Career Counselor and Education Advisor.
    Analyze the following user profile and recommend 3 specific courses/skills they should learn.
    
    User Profile:
    - Education Level: {request.education_level}
    - Stream: {request.stream or 'N/A'}
    - Branch: {request.branch or 'N/A'}
    - Semester: {request.semester or 'N/A'}
    - Current Skills: {', '.join(request.skills)}
    - Career Goal: {request.career_goal}
    - Budget: {request.budget}
    
    Respond STRICTLY in JSON format with no markdown, following this structure:
    [
      {{
        "course_title": "string",
        "why_recommended": "string (explain why this fits their profile)",
        "skills_to_learn": ["string"],
        "expected_salary": "string (e.g., '6-10 LPA')"
      }}
    ]
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        text_response = response.text
        
        # Clean up JSON if model added markdown formatting
        if text_response.startswith("```json"):
            text_response = text_response[7:-3]
        elif text_response.startswith("```"):
            text_response = text_response[3:-3]
            
        recommendations = json.loads(text_response.strip())
        return {"recommendations": recommendations}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Recommendation failed: {str(e)}")
