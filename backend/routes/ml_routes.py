"""
Machine Learning Routes.
Handles Random Forest, Decision Tree, XGBoost predictions for Learning Persona and Careers.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/api/ml", tags=["Machine Learning"])

@router.post("/predict-persona")
async def predict_persona(metrics: dict):
    """Placeholder for ML Learning Persona prediction."""
    return {"persona": "Visual Learner", "confidence": 0.85}

@router.post("/predict-career")
async def predict_career(metrics: dict):
    """Placeholder for ML Career prediction."""
    return {"career": "AI Engineer", "confidence": 0.92}
