"""
Massive Seed script to populate MongoDB with realistic synthetic data for development/testing.
Run: python seed_data.py
"""
import asyncio
import random
from datetime import datetime, timezone, timedelta
from database import (
    notifications_collection, 
    courses_collection, 
    jobs_collection, 
    scholarships_collection,
    colleges_collection,
    roadmaps_collection,
    learning_paths_collection,
    db
)

# Realistic Data generators
COURSE_PROVIDERS = ["Coursera", "Google", "Microsoft", "IBM", "AWS", "freeCodeCamp", "Harvard", "Stanford", "edX", "Udemy", "NPTEL", "SWAYAM"]
TECH_KEYWORDS = ["Python", "JavaScript", "React", "AI", "Machine Learning", "Data Science", "Cloud", "Cybersecurity", "Blockchain", "DevOps"]
LEVELS = ["Beginner", "Intermediate", "Advanced"]
COMPANY_PREFIXES = ["Tech", "Global", "NextGen", "Smart", "Quantum", "Future", "Alpha", "Beta", "Data"]
COMPANY_SUFFIXES = ["Corp", "Inc", "Solutions", "Dynamics", "Systems", "Networks", "Labs", "AI"]
JOB_ROLES = ["Software Engineer", "Data Scientist", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Cloud Architect", "AI Researcher", "Full Stack Developer"]
CITIES = ["San Francisco", "New York", "London", "Bengaluru", "Berlin", "Toronto", "Remote"]
SCHOLARSHIP_PROVIDERS = ["Google", "Microsoft", "Amazon", "National Science Foundation", "Tech for Good", "Women in Tech", "Global Education Fund"]


async def seed_courses(count=300):
    await courses_collection.delete_many({})
    courses = []
    
    # Specific targeted courses
    specific_courses = [
        {"title": "Machine Learning A-Z: AI, Python & R", "provider": "Udemy", "thumbnail": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80", "duration": "44 hours", "difficulty": "Beginner", "price": 499, "is_free": False, "rating": 4.8, "skills_covered": ["Python", "Machine Learning", "Data Science"], "target_audience": ["B.Tech", "Undergraduate", "Job Seeker"], "url": "https://udemy.com", "certificate_offered": True},
        {"title": "CS50: Introduction to Computer Science", "provider": "Harvard", "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80", "duration": "12 weeks", "difficulty": "Beginner", "price": 0, "is_free": True, "rating": 4.9, "skills_covered": ["C", "Python", "SQL", "Algorithms"], "target_audience": ["Class 11", "Class 12", "Undergraduate"], "url": "https://edx.org", "certificate_offered": True},
        {"title": "Python for Data Science and Machine Learning", "provider": "YouTube", "thumbnail": "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&q=80", "duration": "10 hours", "difficulty": "Beginner", "price": 0, "is_free": True, "rating": 4.6, "skills_covered": ["Python", "Pandas", "Scikit-Learn"], "target_audience": ["B.Tech CSE", "BCA"], "url": "https://youtube.com", "certificate_offered": False},
        {"title": "AWS Certified Cloud Practitioner", "provider": "AWS Skill Builder", "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80", "duration": "15 hours", "difficulty": "Intermediate", "price": 0, "is_free": True, "rating": 4.7, "skills_covered": ["Cloud", "AWS", "DevOps"], "target_audience": ["Undergraduate", "Job Seeker"], "url": "https://aws.amazon.com", "certificate_offered": True},
        {"title": "Industrial Safety and Welding Basics", "provider": "NPTEL", "thumbnail": "https://images.unsplash.com/photo-1504917595217-d4ce5eb922fc?w=500&q=80", "duration": "4 weeks", "difficulty": "Beginner", "price": 0, "is_free": True, "rating": 4.2, "skills_covered": ["Safety Training", "Welder", "Industrial Skills"], "target_audience": ["ITI", "Diploma"], "url": "https://nptel.ac.in", "certificate_offered": True},
    ]
    
    courses.extend(specific_courses)
    
    for i in range(count - len(specific_courses)):
        tech = random.choice(TECH_KEYWORDS)
        courses.append({
            "title": f"{random.choice(['Complete', 'Advanced', 'Intro to', 'Mastering', 'Applied'])} {tech} {random.choice(['Bootcamp', 'Masterclass', 'Specialization', 'Certificate'])}",
            "provider": random.choice(COURSE_PROVIDERS),
            "thumbnail": f"https://picsum.photos/seed/course{i}/300/200",
            "duration": f"{random.randint(10, 100)} hours",
            "difficulty": random.choice(LEVELS),
            "price": random.choice([0, 499, 999, 1499]),
            "is_free": random.choice([True, False]),
            "rating": round(random.uniform(3.5, 5.0), 1),
            "skills_covered": [tech, "Problem Solving"],
            "target_audience": [random.choice(["Class 11", "Class 12", "Diploma", "ITI", "Undergraduate", "Postgraduate", "Job Seeker"])],
            "url": "https://example.com/course",
            "certificate_offered": random.choice([True, False]),
            "language": "English",
            "created_at": datetime.now(timezone.utc)
        })
    await courses_collection.insert_many(courses)
    print(f"Seeded {count} Courses")

async def seed_roadmaps_and_learning_paths():
    await roadmaps_collection.delete_many({})
    await learning_paths_collection.delete_many({})
    
    roadmaps = [
        {
            "career": "AI Engineer",
            "description": "Master Artificial Intelligence from basics to advanced Deep Learning techniques.",
            "steps": [
                {"step_number": 1, "title": "Programming Foundation", "description": "Learn Python basics.", "recommended_skills": ["Python", "Logic"], "courses": []},
                {"step_number": 2, "title": "Data Manipulation", "description": "Master data handling.", "recommended_skills": ["NumPy", "Pandas", "SQL"], "courses": []},
                {"step_number": 3, "title": "Machine Learning", "description": "Learn ML algorithms.", "recommended_skills": ["Scikit-Learn", "Regression", "Classification"], "courses": []},
                {"step_number": 4, "title": "Deep Learning", "description": "Master neural networks.", "recommended_skills": ["TensorFlow", "PyTorch", "NLP", "Computer Vision"], "courses": []},
                {"step_number": 5, "title": "Deployment", "description": "Deploy models to production.", "recommended_skills": ["Docker", "AWS", "FastAPI"], "courses": []}
            ]
        },
        {
            "career": "Full Stack Developer",
            "description": "Become a modern web developer capable of building both frontend and backend systems.",
            "steps": [
                {"step_number": 1, "title": "Frontend Basics", "description": "Learn the building blocks of the web.", "recommended_skills": ["HTML", "CSS", "JavaScript"], "courses": []},
                {"step_number": 2, "title": "Frontend Frameworks", "description": "Master modern UI development.", "recommended_skills": ["React", "TailwindCSS"], "courses": []},
                {"step_number": 3, "title": "Backend Development", "description": "Learn server-side programming.", "recommended_skills": ["Node.js", "Express", "Python"], "courses": []},
                {"step_number": 4, "title": "Databases", "description": "Master data storage.", "recommended_skills": ["MongoDB", "PostgreSQL"], "courses": []}
            ]
        }
    ]
    await roadmaps_collection.insert_many(roadmaps)
    print(f"Seeded {len(roadmaps)} Roadmaps")

    learning_paths = [
        {"education_level": "Class 11", "stream": "Science", "recommendations": ["Entrance Preparation", "JEE", "Olympiads", "Coding Basics"]},
        {"education_level": "Undergraduate", "stream": "B.Tech CSE", "recommendations": ["Python", "DSA", "React", "Node.js", "MongoDB", "Cloud", "DevOps", "AI", "ML"]},
        {"education_level": "ITI", "stream": "Electrician", "recommendations": ["Government Jobs", "Apprenticeship", "Industrial Skills", "Safety Training"]},
        {"education_level": "Job Seeker", "stream": "Any", "recommendations": ["Resume Building", "Interview Preparation", "ATS Resume", "LinkedIn Optimization"]}
    ]
    await learning_paths_collection.insert_many(learning_paths)
    print(f"Seeded {len(learning_paths)} Learning Paths")

async def seed_companies_and_jobs(company_count=500, job_count=1000):
    await jobs_collection.delete_many({})
    companies_collection = db["companies"]
    await companies_collection.delete_many({})
    
    companies = []
    for i in range(company_count):
        companies.append({
            "name": f"{random.choice(COMPANY_PREFIXES)}{random.choice(COMPANY_SUFFIXES)} {i}",
            "industry": random.choice(["Technology", "Finance", "Healthcare", "E-commerce"]),
            "website": f"https://company{i}.com",
            "logo_url": f"https://picsum.photos/seed/company{i}/100/100",
            "description": "Leading the future of technology and innovation."
        })
    await companies_collection.insert_many(companies)
    print(f"Seeded {company_count} Companies")
    
    jobs = []
    for i in range(job_count):
        jobs.append({
            "title": random.choice(JOB_ROLES),
            "company_name": random.choice(companies)["name"],
            "location": random.choice(CITIES),
            "is_remote": random.choice([True, False]),
            "salary_range": f"${random.randint(60, 150)}k - ${random.randint(160, 250)}k",
            "required_skills": random.sample(TECH_KEYWORDS, k=3),
            "experience_level": random.choice(["Internship", "Entry", "Mid", "Senior"]),
            "apply_url": "https://example.com/job",
            "job_type": random.choice(["Full-time", "Part-time", "Internship", "Contract"]),
            "posted_at": datetime.now(timezone.utc) - timedelta(days=random.randint(0, 30))
        })
    await jobs_collection.insert_many(jobs)
    print(f"Seeded {job_count} Jobs")

async def seed_scholarships(count=200):
    await scholarships_collection.delete_many({})
    scholarships = []
    for i in range(count):
        scholarships.append({
            "title": f"{random.choice(['Women in Tech', 'Future Leaders', 'STEM Excellence', 'Global Merit'])} Scholarship {datetime.now().year}",
            "provider": random.choice(SCHOLARSHIP_PROVIDERS),
            "amount": f"${random.randint(1, 20) * 1000}",
            "deadline": datetime.now(timezone.utc) + timedelta(days=random.randint(10, 100)),
            "eligibility_criteria": ["Undergraduate Students", "CGPA > 3.5"],
            "apply_url": "https://example.com/scholarship",
            "created_at": datetime.now(timezone.utc)
        })
    await scholarships_collection.insert_many(scholarships)
    print(f"Seeded {count} Scholarships")

async def seed_colleges(count=150):
    from database import colleges_collection
    await colleges_collection.delete_many({})
    
    # Create indexes for 50,000+ scaling performance
    await colleges_collection.create_index([("name", "text"), ("short_name", "text"), ("location.city", "text"), ("location.state", "text")])
    await colleges_collection.create_index("college_id", unique=True)
    await colleges_collection.create_index([("location.state", 1), ("location.city", 1)])
    await colleges_collection.create_index("approval.nirf_rank")
    await colleges_collection.create_index("placement.average_package_lpa")
    
    STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Punjab", "West Bengal", "Gujarat", "Rajasthan"]
    CITIES = ["Mumbai", "New Delhi", "Bengaluru", "Chennai", "Hyderabad", "Noida", "Pune", "Jaipur", "Chandigarh", "Kolkata"]
    COURSES = ["B.Tech", "M.Tech", "BCA", "MCA", "MBBS", "B.Sc", "MBA", "BBA", "Pharmacy", "Nursing", "Law", "Polytechnic"]
    GRADES = ["A++", "A+", "A", "B++", "B+", "B"]

    colleges = []
    for i in range(1, count + 1):
        state = random.choice(STATES)
        city = random.choice(CITIES)
        is_gov = random.choice([True, False])
        is_pvt = not is_gov
        inst_type = "University" if i % 3 == 0 else "Institute"
        
        colleges.append({
            "college_id": f"clg-ind-{1000 + i}",
            "name": f"Indian Institute of {random.choice(['Technology & Science', 'Management & Research', 'Engineering & Innovation', 'Higher Education', 'Medical Sciences'])} #{i}",
            "short_name": f"IIT/NIT-{i}",
            "logo_url": f"https://picsum.photos/seed/logo{i}/100/100",
            "cover_image_url": f"https://picsum.photos/seed/cover{i}/1000/400",
            "gallery_images": [
                f"https://picsum.photos/seed/g1_{i}/600/400",
                f"https://picsum.photos/seed/g2_{i}/600/400"
            ],
            "description": f"Premier {inst_type} providing top-tier academic education, state-of-the-art research laboratories, and stellar placement records across India.",
            "gender_type": random.choice(["Co-ed", "Co-ed", "Co-ed", "Girls"]),
            "scholarship_available": True,
            "location": {
                "country": "India",
                "state": state,
                "district": f"{city} District",
                "city": city,
                "pincode": f"{random.randint(100001, 800000)}",
                "address": f"Campus Sector {random.randint(1, 45)}, Knowledge Park, {city}",
                "latitude": 28.6139 + random.uniform(-2, 2),
                "longitude": 77.2090 + random.uniform(-2, 2)
            },
            "details": {
                "is_government": is_gov,
                "is_private": is_pvt,
                "is_deemed": i % 5 == 0,
                "is_state_university": is_gov and i % 2 == 0,
                "is_central_university": is_gov and i % 4 == 0,
                "is_autonomous": True,
                "institution_type": inst_type
            },
            "approval": {
                "ugc_approved": True,
                "aicte_approved": True,
                "naac_grade": random.choice(GRADES),
                "nba_accredited": True,
                "nirf_rank": random.randint(1, 150),
                "accreditation": "UGC & AICTE Accredited"
            },
            "courses": [
                {"name": "B.Tech", "branch": "Computer Science & AI", "duration_years": 4, "tuition_fee_per_year": random.randint(80000, 250000), "total_seats": 180},
                {"name": "MCA", "branch": "Data Science", "duration_years": 2, "tuition_fee_per_year": random.randint(60000, 150000), "total_seats": 60},
                {"name": "MBA", "branch": "Business Analytics", "duration_years": 2, "tuition_fee_per_year": random.randint(120000, 400000), "total_seats": 120}
            ],
            "fees": {
                "tuition_fee_min": float(random.randint(40000, 90000)),
                "tuition_fee_max": float(random.randint(120000, 350000)),
                "hostel_fee_per_year": float(random.randint(40000, 90000)),
                "other_charges": 15000.0
            },
            "placement": {
                "placement_percentage": float(random.randint(75, 99)),
                "highest_package_lpa": float(random.randint(18, 65)),
                "average_package_lpa": round(random.uniform(5.5, 18.5), 1),
                "top_recruiters": ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Adobe", "Goldman Sachs"]
            },
            "campus": {
                "hostel": True,
                "wifi": True,
                "library": True,
                "labs": True,
                "sports": True,
                "transport": True,
                "cafeteria": True,
                "medical": True,
                "auditorium": True
            },
            "admission": {
                "eligibility": "10+2 with 60% aggregate in Physics, Chemistry & Mathematics",
                "entrance_exams": ["JEE Main", "CUET UG", "GATE", "CAT"],
                "cutoff_info": "Top 15,000 Rank in JEE Main / CUET percentile > 92%",
                "seat_intake": random.randint(600, 2400)
            },
            "contact": {
                "official_website": f"https://www.college{i}.edu.in",
                "email": f"admissions@college{i}.edu.in",
                "phone": f"+91 {random.randint(7000000000, 9999999999)}"
            },
            "popularity_score": random.randint(70, 99),
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        })

    await colleges_collection.insert_many(colleges)
    print(f"Seeded {count} Indian Colleges into MongoDB with full schema and indexes!")

async def main():
    print("Starting massive database seeding...")
    await seed_courses(100)
    await seed_roadmaps_and_learning_paths()
    await seed_companies_and_jobs(50, 100)
    await seed_scholarships(50)
    await seed_colleges(150)
    print("All synthetic data seeding complete!")


if __name__ == "__main__":
    asyncio.run(main())

