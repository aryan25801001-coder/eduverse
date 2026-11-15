"""
MongoDB async database connection using Motor.
Exposes individual collection references for each domain.
"""
import motor.motor_asyncio
from config import MONGO_URI, DB_NAME

# Create async MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collection references
users_collection = db["users"]
profiles_collection = db["profiles"]
assessments_collection = db["assessments"]
predictions_collection = db["predictions"]
notifications_collection = db["notifications"]
courses_collection = db["courses"]
jobs_collection = db["jobs"]
scholarships_collection = db["scholarships"]
mentor_chats_collection = db["mentor_chats"]
colleges_collection = db["colleges"]
roadmaps_collection = db["roadmaps"]
learning_paths_collection = db["learning_paths"]
course_categories_collection = db["course_categories"]
