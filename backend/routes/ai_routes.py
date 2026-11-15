"""
AI Routes.
Handles interactions with Gemini AI for career guidance and roadmap generation.
"""
import os
import uuid
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime, timezone
import google.generativeai as genai

from database import mentor_chats_collection, users_collection, profiles_collection
from config import MONGO_URI # Assuming we might need config things, but we mostly just need env vars

router = APIRouter(prefix="/api/ai", tags=["AI Integration"])

# Configure Gemini API
# This requires the GEMINI_API_KEY environment variable to be set.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/mentor/chat")
async def chat_with_mentor(request: ChatRequest):
    """
    Endpoint for the EduVerse AI Mentor.
    Connects to Google Gemini API and acts as a professional career coach.
    """
    if not GEMINI_API_KEY:
        # Fallback if API key is not set
        return {"response": "I am currently in offline mode (API Key missing). Please add GEMINI_API_KEY to the .env file to enable my full AI capabilities."}

    try:
        # 1. Fetch User Data to provide context to the AI
        user = None
        profile = None
        # Try to find user by ID if valid Mongo ObjectId, or email if passed.
        # Since we mocked user123 in frontend, let's just do a generic search or handle gracefully.
        from bson import ObjectId
        from bson.errors import InvalidId
        try:
            if len(request.user_id) == 24:
                user = await users_collection.find_one({"_id": ObjectId(request.user_id)})
        except InvalidId:
            pass
            
        if user:
            profile = await profiles_collection.find_one({"user_email": user.get("email")})

        # 2. Build the System Prompt
        user_context = "User Context: Anonymous User."
        if user and profile:
            user_context = f"""
            User Context:
            Name: {user.get('name', 'Unknown')}
            Education Level: {user.get('education_level', 'Unknown')}
            Qualification: {user.get('current_qualification', 'Unknown')}
            Branch: {user.get('branch_stream', 'Unknown')}
            Skills: {', '.join(user.get('skills', []))}
            Interests: {', '.join(user.get('interests', []))}
            Preferred Career: {user.get('preferred_career', 'Unknown')}
            """

        system_prompt = f"""
        Always behave as: EduVerse AI Mentor
        You are not a generic chatbot. You are an AI Career Mentor.
        Your goal is to help students and professionals grow.
        Always provide Clear, Professional, Practical, and Step-by-step answers.
        
        You support: Career Guidance, Learning Guidance, Coding Help, Resume Review, 
        Interview Preparation, Project Ideas, Skill Gap Analysis, Learning Roadmap, 
        Weekly Study Plan, Course Recommendation, Internship Guidance, and Motivation.

        If asked for roadmaps, format them clearly with bullet points.
        If asked for certifications, suggest verified ones like Google, IBM, Microsoft, AWS, Coursera.
        
        {user_context}
        """

        # 3. Call Gemini API
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=system_prompt
        )
        
        # We can implement full conversation history here by fetching past chats
        # For now, we do a one-shot prompt with context
        response = model.generate_content(request.message)
        ai_text = response.text

        # 4. Store Conversation in Database
        chat_doc = {
            "conversation_id": str(uuid.uuid4()),
            "user_id": request.user_id,
            "prompt": request.message,
            "response": ai_text,
            "timestamp": datetime.now(timezone.utc)
        }
        await mentor_chats_collection.insert_one(chat_doc)

        return {"response": ai_text}

    except Exception as e:
        print(f"Error in Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Failed to connect to AI Mentor brain.")
