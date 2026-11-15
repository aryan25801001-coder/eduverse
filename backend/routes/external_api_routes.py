"""
External API Routes.
Wrappers for YouTube, Jobs, GitHub, and News APIs.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/api/external", tags=["External APIs"])

@router.get("/courses")
async def get_courses(query: str):
    """Placeholder for YouTube / External course fetching."""
    return {"courses": []}

@router.get("/jobs")
async def get_jobs(query: str):
    """Placeholder for Job fetching."""
    return {"jobs": []}

@router.get("/news")
async def get_news():
    """Placeholder for News fetching."""
    return {"news": []}

@router.get("/github")
async def get_github_repos(topic: str):
    """Placeholder for GitHub repositories fetching."""
    return {"repositories": []}
