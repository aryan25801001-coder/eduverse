"""
FastAPI Application Entry Point.
Mounts all route modules and configures CORS middleware.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import ALLOWED_ORIGINS
from routes.auth_routes import router as auth_router
from routes.profile_routes import router as profile_router
from routes.assessment_routes import router as assessment_router
from routes.prediction_routes import router as prediction_router
from routes.notification_routes import router as notification_router
from routes.ai_routes import router as ai_router
from routes.ml_routes import router as ml_router
from routes.external_api_routes import router as external_api_router
from routes.college_routes import router as college_router
from routes.course_routes import course_router

# Initialize FastAPI application

app = FastAPI(
    title="EduVerse AI — Student Learning Persona & Career Prediction API",
    description="Backend API for student assessment, career prediction, and learning persona analysis.",
    version="2.0.0",
)

# CORS Configuration — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(assessment_router)
app.include_router(prediction_router)
app.include_router(notification_router)
app.include_router(ai_router)
app.include_router(ml_router)
app.include_router(external_api_router)
app.include_router(college_router)
app.include_router(course_router)

@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "app": "EduVerse AI Backend",
        "version": "2.0.0",
        "docs": "/docs"
    }


@app.get("/api/health")
async def health_check():
    """API health check."""
    return {"status": "healthy", "message": "All systems operational"}
