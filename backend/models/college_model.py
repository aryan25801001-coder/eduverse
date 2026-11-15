"""
College Model & Schema definitions for MongoDB and FastAPI APIs.
Supports comprehensive college profiles, filters, comparisons, and AI recommendations.
"""
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime

class LocationSchema(BaseModel):
    country: str = "India"
    state: str
    district: str
    city: str
    pincode: str
    address: str
    latitude: Optional[float] = 0.0
    longitude: Optional[float] = 0.0

class DetailsSchema(BaseModel):
    is_government: bool = False
    is_private: bool = False
    is_deemed: bool = False
    is_state_university: bool = False
    is_central_university: bool = False
    is_autonomous: bool = False
    institution_type: str = "Institute" # College, University, Institute

class ApprovalSchema(BaseModel):
    ugc_approved: bool = True
    aicte_approved: bool = True
    naac_grade: str = "A+" # A++, A+, A, B++, B+, B, C
    nba_accredited: bool = False
    nirf_rank: Optional[int] = None
    accreditation: Optional[str] = "UGC Approved"

class CourseItemSchema(BaseModel):
    name: str # e.g. B.Tech, MCA, MBA
    branch: Optional[str] = "Computer Science"
    duration_years: int = 4
    tuition_fee_per_year: float = 100000
    total_seats: int = 120

class FeesSchema(BaseModel):
    tuition_fee_min: float = 50000
    tuition_fee_max: float = 200000
    hostel_fee_per_year: float = 60000
    other_charges: float = 10000

class PlacementSchema(BaseModel):
    placement_percentage: float = 85.0
    highest_package_lpa: float = 24.0
    average_package_lpa: float = 6.5
    top_recruiters: List[str] = ["Google", "Microsoft", "TCS", "Infosys", "Wipro", "Amazon"]

class CampusSchema(BaseModel):
    hostel: bool = True
    wifi: bool = True
    library: bool = True
    labs: bool = True
    sports: bool = True
    transport: bool = True
    cafeteria: bool = True
    medical: bool = True
    auditorium: bool = True

class AdmissionSchema(BaseModel):
    eligibility: str = "10+2 with 60% in PCM"
    entrance_exams: List[str] = ["JEE Main", "CUET", "GATE"]
    cutoff_info: str = "JEE Main Rank < 45000"
    seat_intake: int = 1200

class ContactSchema(BaseModel):
    official_website: str
    email: str
    phone: str

class CollegeDB(BaseModel):
    college_id: str
    name: str
    short_name: str
    logo_url: str
    cover_image_url: str
    gallery_images: List[str] = []
    description: str
    gender_type: str = "Co-ed" # Co-ed, Girls, Boys
    scholarship_available: bool = True
    
    location: LocationSchema
    details: DetailsSchema
    approval: ApprovalSchema
    courses: List[CourseItemSchema] = []
    fees: FeesSchema
    placement: PlacementSchema
    campus: CampusSchema
    admission: AdmissionSchema
    contact: ContactSchema
    
    popularity_score: int = 85
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CollegeFilterRequest(BaseModel):
    search: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    district: Optional[str] = None
    is_government: Optional[bool] = None
    is_private: Optional[bool] = None
    is_university: Optional[bool] = None
    naac_grade: Optional[str] = None
    min_nirf: Optional[int] = None
    max_nirf: Optional[int] = None
    ugc_approved: Optional[bool] = None
    aicte_approved: Optional[bool] = None
    course: Optional[str] = None
    max_fee: Optional[float] = None
    min_placement_pct: Optional[float] = None
    min_avg_package: Optional[float] = None
    has_hostel: Optional[bool] = None
    gender_type: Optional[str] = None
    sort_by: Optional[str] = "popularity" # popularity, nirf_rank, highest_package, lowest_fee, highest_placement, alpha
    page: int = 1
    limit: int = 12

class AIRecommendRequest(BaseModel):
    state: Optional[str] = None
    max_budget: Optional[float] = 200000
    target_career: Optional[str] = "AI Engineer"
    preferred_course: Optional[str] = "B.Tech"
