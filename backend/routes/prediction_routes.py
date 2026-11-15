"""
Prediction routes.
Serves career predictions and learning persona analysis.
Generates predictions based on assessment scores and profile data.
"""
from fastapi import APIRouter, Depends
from datetime import datetime, timezone
from database import predictions_collection, assessments_collection, profiles_collection
from auth import get_current_user

router = APIRouter(prefix="/api/prediction", tags=["Prediction"])


def generate_career_predictions(section_scores: dict, profile: dict) -> list:
    """
    Generate career predictions based on assessment scores and profile.
    In production, this would use an ML model — here we use rule-based logic.
    """
    careers = []

    prog = section_scores.get("Programming", 50)
    logic = section_scores.get("Logical Reasoning", 50)
    creative = section_scores.get("Creativity", 50)
    comm = section_scores.get("Communication", 50)
    lead = section_scores.get("Leadership", 50)
    critical = section_scores.get("Critical Thinking", 50)
    ps = section_scores.get("Problem Solving", 50)

    # AI/ML Engineer
    ai_score = (prog * 0.3 + logic * 0.25 + ps * 0.2 + critical * 0.15 + creative * 0.1)
    careers.append({
        "title": "AI / Machine Learning Engineer",
        "prediction_percentage": round(min(ai_score, 98), 1),
        "salary_range": "₹8L - ₹45L / year",
        "required_skills": ["Python", "TensorFlow", "PyTorch", "Statistics", "Linear Algebra", "NLP"],
        "job_description": "Design, build and deploy machine learning models and AI systems. Work with large datasets, optimize algorithms, and integrate AI into production applications.",
        "roadmap": [
            "Master Python and Mathematics",
            "Learn ML fundamentals (Andrew Ng's course)",
            "Build 3-5 ML projects",
            "Study Deep Learning and NLP",
            "Contribute to open source ML projects",
            "Apply for ML internships"
        ],
        "recommended_certifications": ["Google TensorFlow Developer", "AWS ML Specialty", "Deep Learning Specialization"],
        "recommended_courses": ["Stanford CS229", "Fast.ai Practical Deep Learning", "Kaggle ML Courses"]
    })

    # Full Stack Developer
    fs_score = (prog * 0.35 + creative * 0.2 + ps * 0.2 + logic * 0.15 + comm * 0.1)
    careers.append({
        "title": "Full Stack Developer",
        "prediction_percentage": round(min(fs_score, 95), 1),
        "salary_range": "₹6L - ₹35L / year",
        "required_skills": ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
        "job_description": "Build end-to-end web applications handling both frontend UI and backend APIs. Design scalable architectures and implement responsive user interfaces.",
        "roadmap": [
            "Master HTML, CSS, JavaScript",
            "Learn React.js and Next.js",
            "Study Node.js and Express",
            "Build full-stack projects with databases",
            "Learn DevOps and deployment",
            "Contribute to open source projects"
        ],
        "recommended_certifications": ["Meta Front-End Developer", "AWS Solutions Architect", "MongoDB Developer"],
        "recommended_courses": ["The Odin Project", "Full Stack Open (Helsinki)", "freeCodeCamp"]
    })

    # Data Scientist
    ds_score = (logic * 0.25 + prog * 0.2 + critical * 0.25 + ps * 0.15 + comm * 0.15)
    careers.append({
        "title": "Data Scientist",
        "prediction_percentage": round(min(ds_score, 92), 1),
        "salary_range": "₹7L - ₹40L / year",
        "required_skills": ["Python", "R", "SQL", "Tableau", "Statistics", "Machine Learning"],
        "job_description": "Extract insights from complex datasets using statistical analysis, machine learning, and data visualization. Drive data-informed business decisions.",
        "roadmap": [
            "Learn Statistics and Probability",
            "Master Python for Data Analysis",
            "Study SQL and Database Management",
            "Learn Data Visualization tools",
            "Complete Kaggle competitions",
            "Build a data science portfolio"
        ],
        "recommended_certifications": ["IBM Data Science Professional", "Google Data Analytics", "DataCamp Certifications"],
        "recommended_courses": ["Harvard CS109", "DataCamp Career Track", "Coursera Data Science Specialization"]
    })

    # Product Manager
    pm_score = (comm * 0.3 + lead * 0.25 + critical * 0.2 + creative * 0.15 + ps * 0.1)
    careers.append({
        "title": "Product Manager",
        "prediction_percentage": round(min(pm_score, 88), 1),
        "salary_range": "₹10L - ₹50L / year",
        "required_skills": ["Product Strategy", "Data Analysis", "User Research", "Agile/Scrum", "Communication", "Roadmapping"],
        "job_description": "Define product vision and strategy, prioritize features based on user needs and business goals, and coordinate between engineering, design, and business teams.",
        "roadmap": [
            "Study product management fundamentals",
            "Learn user research methods",
            "Understand Agile methodology",
            "Build a product case study portfolio",
            "Get a PM internship",
            "Join product communities (Lenny's, Mind the Product)"
        ],
        "recommended_certifications": ["Google Project Management", "Pragmatic Institute PMC", "Scrum Product Owner (CSPO)"],
        "recommended_courses": ["Reforge Growth Series", "Product School", "Udemy Product Management Bootcamp"]
    })

    # Cybersecurity Analyst
    sec_score = (logic * 0.3 + critical * 0.25 + prog * 0.2 + ps * 0.15 + creative * 0.1)
    careers.append({
        "title": "Cybersecurity Analyst",
        "prediction_percentage": round(min(sec_score, 85), 1),
        "salary_range": "₹5L - ₹30L / year",
        "required_skills": ["Network Security", "Ethical Hacking", "SIEM", "Linux", "Python", "Cryptography"],
        "job_description": "Protect organizations from cyber threats by monitoring systems, analyzing vulnerabilities, implementing security measures, and responding to incidents.",
        "roadmap": [
            "Study networking fundamentals (CompTIA Network+)",
            "Learn Linux administration",
            "Practice on TryHackMe/HackTheBox",
            "Get CompTIA Security+ certified",
            "Learn penetration testing",
            "Pursue CEH or OSCP certification"
        ],
        "recommended_certifications": ["CompTIA Security+", "CEH (EC-Council)", "OSCP"],
        "recommended_courses": ["TryHackMe Learning Paths", "Cybrary", "SANS Institute Courses"]
    })

    # Sort by prediction percentage
    careers.sort(key=lambda x: x["prediction_percentage"], reverse=True)
    return careers


def generate_learning_persona(section_scores: dict) -> dict:
    """Generate a learning persona based on assessment section scores."""
    # Determine dominant traits
    style_score = section_scores.get("Learning Style", 50)
    personality_score = section_scores.get("Personality", 50)
    prog = section_scores.get("Programming", 50)
    creative = section_scores.get("Creativity", 50)
    logic = section_scores.get("Logical Reasoning", 50)
    lead = section_scores.get("Leadership", 50)
    comm = section_scores.get("Communication", 50)

    # Persona classification
    avg = sum(section_scores.values()) / len(section_scores) if section_scores else 50

    if prog >= 75 and logic >= 70:
        persona = {
            "persona_name": "The Analytical Architect 🏗️",
            "description": "You are a systematic thinker who excels at breaking down complex problems into logical components. You thrive in structured environments and enjoy building elegant solutions from the ground up.",
            "strengths": ["Algorithmic Thinking", "Systematic Problem Solving", "Technical Depth", "Pattern Recognition", "Code Quality"],
            "weaknesses": ["May overlook creative alternatives", "Can be over-analytical", "Needs to develop soft skills"],
            "recommended_learning_strategy": "Project-based learning with incremental complexity. Start with fundamentals, build structured projects, and gradually tackle advanced problems.",
            "best_study_methods": ["Coding along with tutorials", "Building personal projects", "Competitive programming", "Technical documentation reading", "Pair programming sessions"],
            "career_suitability": ["Software Engineer", "AI/ML Engineer", "Data Scientist", "Systems Architect", "Backend Developer"],
        }
    elif creative >= 75 and comm >= 65:
        persona = {
            "persona_name": "The Creative Innovator 🎨",
            "description": "You combine creativity with strong communication skills. You excel at thinking outside the box and presenting ideas compellingly. Design thinking comes naturally to you.",
            "strengths": ["Creative Problem Solving", "Visual Thinking", "Communication", "User Empathy", "Innovation"],
            "weaknesses": ["May need stronger technical depth", "Can lose focus on details", "Should develop analytical rigor"],
            "recommended_learning_strategy": "Design-first approach with visual learning. Use mind maps, prototyping tools, and creative projects to reinforce concepts.",
            "best_study_methods": ["Mind mapping", "Visual note-taking", "Design sprints", "Video tutorials", "Creative project building"],
            "career_suitability": ["UX/UI Designer", "Product Manager", "Creative Director", "Frontend Developer", "Content Strategist"],
        }
    elif lead >= 70 and comm >= 70:
        persona = {
            "persona_name": "The Strategic Leader 👑",
            "description": "You are a natural leader with excellent communication and strategic thinking abilities. You thrive in team environments and have a talent for organizing and motivating others.",
            "strengths": ["Team Leadership", "Strategic Thinking", "Communication", "Decision Making", "Project Management"],
            "weaknesses": ["May delegate too much technical work", "Should deepen domain expertise", "Can be impatient with slow progress"],
            "recommended_learning_strategy": "Collaborative learning with leadership roles. Join study groups, mentor juniors, and take on project lead positions.",
            "best_study_methods": ["Group discussions", "Case studies", "Teaching others", "Leadership workshops", "Real-world project management"],
            "career_suitability": ["Product Manager", "Engineering Manager", "Tech Lead", "Business Analyst", "Startup Founder"],
        }
    else:
        persona = {
            "persona_name": "The Balanced Explorer 🧭",
            "description": "You have a well-rounded skill set with no extreme strengths or weaknesses. You are adaptable and open to learning new things, making you versatile in various roles.",
            "strengths": ["Adaptability", "Well-rounded Skills", "Quick Learning", "Versatility", "Open-mindedness"],
            "weaknesses": ["May need to develop a specialization", "Could benefit from deeper focus in one area", "Should identify a primary career path"],
            "recommended_learning_strategy": "Exploratory learning across multiple domains followed by specialization. Try different areas, find your passion, then go deep.",
            "best_study_methods": ["Online courses across topics", "Hackathons and workshops", "Cross-disciplinary projects", "Mentorship programs", "Self-paced exploration"],
            "career_suitability": ["Full Stack Developer", "Technical Consultant", "Solutions Architect", "DevOps Engineer", "Freelancer"],
        }

    persona["progress_score"] = round(avg, 1)
    persona["confidence_percentage"] = round(min(avg * 1.1, 98), 1)

    return persona


@router.get("/career")
async def get_career_prediction(current_user: dict = Depends(get_current_user)):
    """Get career predictions for the current student."""
    # Check for existing prediction
    existing = await predictions_collection.find_one(
        {"student_email": current_user["email"], "type": "career"},
        {"_id": 0}
    )
    if existing:
        return existing

    # Get assessment scores
    assessment = await assessments_collection.find_one(
        {"student_email": current_user["email"]},
        sort=[("completed_at", -1)]
    )

    # Get profile data
    profile = await profiles_collection.find_one(
        {"student_email": current_user["email"]}
    )

    section_scores = assessment.get("section_scores", {}) if assessment else {}
    profile_data = profile or {}

    careers = generate_career_predictions(section_scores, profile_data)
    confidence = round(sum(c["prediction_percentage"] for c in careers) / len(careers), 1) if careers else 50.0

    prediction_doc = {
        "student_email": current_user["email"],
        "type": "career",
        "top_careers": careers,
        "confidence_score": confidence,
        "generated_at": datetime.now(timezone.utc),
    }

    await predictions_collection.update_one(
        {"student_email": current_user["email"], "type": "career"},
        {"$set": prediction_doc},
        upsert=True
    )

    prediction_doc.pop("_id", None)
    return prediction_doc


@router.get("/persona")
async def get_learning_persona(current_user: dict = Depends(get_current_user)):
    """Get learning persona analysis for the current student."""
    # Check for existing persona
    existing = await predictions_collection.find_one(
        {"student_email": current_user["email"], "type": "persona"},
        {"_id": 0}
    )
    if existing:
        return existing

    # Get assessment scores
    assessment = await assessments_collection.find_one(
        {"student_email": current_user["email"]},
        sort=[("completed_at", -1)]
    )

    section_scores = assessment.get("section_scores", {}) if assessment else {}
    persona = generate_learning_persona(section_scores)

    persona_doc = {
        "student_email": current_user["email"],
        "type": "persona",
        **persona,
        "generated_at": datetime.now(timezone.utc),
    }

    await predictions_collection.update_one(
        {"student_email": current_user["email"], "type": "persona"},
        {"$set": persona_doc},
        upsert=True
    )

    persona_doc.pop("_id", None)
    return persona_doc


@router.post("/regenerate")
async def regenerate_predictions(current_user: dict = Depends(get_current_user)):
    """Force-regenerate both career predictions and learning persona."""
    # Delete existing predictions
    await predictions_collection.delete_many({"student_email": current_user["email"]})

    # Re-fetch fresh data
    career = await get_career_prediction(current_user)
    persona = await get_learning_persona(current_user)

    return {
        "message": "Predictions regenerated successfully",
        "career": career,
        "persona": persona,
    }
