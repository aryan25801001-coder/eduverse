"""
Assessment routes.
Handles fetching MCQ questions and storing assessment submissions.
"""
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, timezone
from database import assessments_collection
from models.assessment import AssessmentSubmission
from auth import get_current_user

router = APIRouter(prefix="/api/assessment", tags=["Assessment"])

# Professional MCQ questions organized by section
ASSESSMENT_QUESTIONS = [
    # ── Academic Details ──
    {"id": "acad_1", "section": "Academic Details", "question": "What is your current CGPA range?", "options": ["Below 6.0", "6.0 - 7.0", "7.0 - 8.0", "8.0 - 9.0", "Above 9.0"], "correct_answer": None},
    {"id": "acad_2", "section": "Academic Details", "question": "How many backlogs do you currently have?", "options": ["None", "1-2", "3-4", "More than 4"], "correct_answer": None},
    {"id": "acad_3", "section": "Academic Details", "question": "What is your preferred area of specialization?", "options": ["AI/ML", "Web Development", "Data Science", "Cybersecurity", "Cloud Computing"], "correct_answer": None},

    # ── Learning Style ──
    {"id": "ls_1", "section": "Learning Style", "question": "How do you best absorb new information?", "options": ["Reading textbooks and notes", "Watching video tutorials", "Hands-on practice and labs", "Group discussions and debates", "Teaching concepts to others"], "correct_answer": None},
    {"id": "ls_2", "section": "Learning Style", "question": "When studying for exams, you prefer to:", "options": ["Create detailed notes and summaries", "Use flashcards and mnemonics", "Solve past papers and practice problems", "Discuss topics with peers", "Create mind maps and visual diagrams"], "correct_answer": None},
    {"id": "ls_3", "section": "Learning Style", "question": "Your ideal study environment is:", "options": ["Completely silent library", "With light background music", "In a group study session", "Outdoors or a café", "Walking while listening to podcasts"], "correct_answer": None},

    # ── Personality ──
    {"id": "per_1", "section": "Personality", "question": "In a team project, you naturally tend to:", "options": ["Lead and organize the team", "Research and analyze data", "Design creative solutions", "Handle communication and presentations", "Code and implement the technical parts"], "correct_answer": None},
    {"id": "per_2", "section": "Personality", "question": "When facing a challenge, your first instinct is to:", "options": ["Break it down into smaller steps", "Seek guidance from an expert", "Brainstorm multiple approaches", "Research similar problems online", "Try solving it immediately by trial-and-error"], "correct_answer": None},
    {"id": "per_3", "section": "Personality", "question": "How do you handle constructive criticism?", "options": ["Welcome it and improve immediately", "Analyze it before acting", "Feel motivated to prove myself", "Discuss it further for clarity", "It depends on the context"], "correct_answer": None},

    # ── Programming ──
    {"id": "prog_1", "section": "Programming", "question": "What is the time complexity of binary search?", "options": ["O(n)", "O(log n)", "O(n log n)", "O(n²)", "O(1)"], "correct_answer": 1},
    {"id": "prog_2", "section": "Programming", "question": "Which data structure uses LIFO (Last In, First Out) principle?", "options": ["Queue", "Array", "Stack", "Linked List", "Tree"], "correct_answer": 2},
    {"id": "prog_3", "section": "Programming", "question": "What does REST stand for in API development?", "options": ["Rapid Execution Standard Transfer", "Representational State Transfer", "Remote System Testing", "Real-time Event Streaming Technology", "Resource Extraction Service Tool"], "correct_answer": 1},

    # ── Problem Solving ──
    {"id": "ps_1", "section": "Problem Solving", "question": "A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat holds the farmer and one item. Which should he take first?", "options": ["The wolf", "The goat", "The cabbage", "Any — order doesn't matter", "He cannot cross"], "correct_answer": 1},
    {"id": "ps_2", "section": "Problem Solving", "question": "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", "options": ["100 minutes", "5 minutes", "20 minutes", "1 minute", "50 minutes"], "correct_answer": 1},
    {"id": "ps_3", "section": "Problem Solving", "question": "You have 8 balls, one is heavier. Using a balance scale, what is the minimum weighings needed to find the heavy one?", "options": ["1", "2", "3", "4", "It's impossible"], "correct_answer": 1},

    # ── Communication ──
    {"id": "comm_1", "section": "Communication", "question": "When presenting a technical topic to a non-technical audience, you should:", "options": ["Use as many technical terms as possible", "Use analogies and simple language", "Skip the explanation entirely", "Only provide the conclusion", "Share the raw data and let them interpret"], "correct_answer": 1},
    {"id": "comm_2", "section": "Communication", "question": "Active listening involves:", "options": ["Interrupting to show enthusiasm", "Thinking about your response while others speak", "Maintaining eye contact and asking clarifying questions", "Only listening to facts, not emotions", "Taking notes on everything said"], "correct_answer": 2},
    {"id": "comm_3", "section": "Communication", "question": "The best way to handle a disagreement in a professional setting is to:", "options": ["Avoid the person entirely", "Raise your voice to emphasize your point", "Listen to the other perspective and find common ground", "Always agree with the majority", "Report it to management immediately"], "correct_answer": 2},

    # ── Leadership ──
    {"id": "lead_1", "section": "Leadership", "question": "A good leader should primarily focus on:", "options": ["Making all decisions alone", "Empowering team members to contribute", "Following instructions from above", "Completing tasks fastest", "Maintaining strict hierarchy"], "correct_answer": 1},
    {"id": "lead_2", "section": "Leadership", "question": "When a team member is underperforming, a leader should:", "options": ["Replace them immediately", "Publicly criticize to motivate", "Have a private one-on-one discussion to understand issues", "Ignore it and hope they improve", "Assign their tasks to others"], "correct_answer": 2},
    {"id": "lead_3", "section": "Leadership", "question": "What is the most important quality in a student leader?", "options": ["Authority", "Technical expertise only", "Emotional intelligence and empathy", "Being the smartest in the room", "Following trends"], "correct_answer": 2},

    # ── Creativity ──
    {"id": "crt_1", "section": "Creativity", "question": "You are given an empty box. In a creative context, what could it represent?", "options": ["Just an empty box", "A stage for a miniature play", "A metaphor for potential and opportunity", "A prototype for an app interface", "All of the above"], "correct_answer": 4},
    {"id": "crt_2", "section": "Creativity", "question": "Which approach is most effective for generating creative ideas?", "options": ["Working alone in isolation", "Brainstorming without judgment first, then refining", "Only using proven methods", "Copying successful solutions", "Avoiding risks entirely"], "correct_answer": 1},
    {"id": "crt_3", "section": "Creativity", "question": "Design thinking primarily begins with:", "options": ["Prototyping a solution", "Defining the technology stack", "Empathizing with the user", "Writing code", "Creating a business plan"], "correct_answer": 2},

    # ── Logical Reasoning ──
    {"id": "logic_1", "section": "Logical Reasoning", "question": "If all roses are flowers, and some flowers fade quickly, then:", "options": ["All roses fade quickly", "Some roses may fade quickly", "No roses fade quickly", "Roses are not flowers", "None of the above"], "correct_answer": 1},
    {"id": "logic_2", "section": "Logical Reasoning", "question": "Complete the pattern: 2, 6, 12, 20, 30, ?", "options": ["36", "40", "42", "48", "56"], "correct_answer": 2},
    {"id": "logic_3", "section": "Logical Reasoning", "question": "If APPLE is coded as 50 and BANANA is coded as 60, what is CHERRY coded as?", "options": ["55", "65", "60", "70", "75"], "correct_answer": 2},

    # ── Critical Thinking ──
    {"id": "ct_1", "section": "Critical Thinking", "question": "A news article claims 'AI will replace 90% of jobs by 2030.' Your first reaction should be to:", "options": ["Believe it and panic", "Dismiss it as fake news", "Check the source, methodology, and evidence behind the claim", "Share it on social media immediately", "It doesn't affect me"], "correct_answer": 2},
    {"id": "ct_2", "section": "Critical Thinking", "question": "Correlation between ice cream sales and drowning deaths means:", "options": ["Ice cream causes drowning", "Drowning causes ice cream sales", "Both are affected by a third factor (summer heat)", "The data is fabricated", "There is no correlation"], "correct_answer": 2},
    {"id": "ct_3", "section": "Critical Thinking", "question": "In evaluating an argument, the most important thing to identify is:", "options": ["The speaker's tone", "The underlying assumptions and evidence", "How popular the argument is", "The length of the argument", "Whether it agrees with your beliefs"], "correct_answer": 1},
]


@router.get("/questions")
async def get_assessment_questions(current_user: dict = Depends(get_current_user)):
    """Retrieve all assessment MCQ questions organized by section."""
    # Group questions by section
    sections = {}
    for q in ASSESSMENT_QUESTIONS:
        section = q["section"]
        if section not in sections:
            sections[section] = []
        # Don't send correct_answer to client
        question_copy = {k: v for k, v in q.items() if k != "correct_answer"}
        sections[section].append(question_copy)

    return {"sections": sections, "total_questions": len(ASSESSMENT_QUESTIONS)}


@router.get("/result")
async def get_assessment_result(current_user: dict = Depends(get_current_user)):
    """Retrieve the current student's latest assessment result."""
    result = await assessments_collection.find_one(
        {"student_email": current_user["email"]},
        {"_id": 0},
        sort=[("completed_at", -1)]
    )
    if not result:
        return {"message": "No assessment found. Please take the assessment first.", "result": None}
    return {"result": result}


@router.post("/submit")
async def submit_assessment(
    submission: AssessmentSubmission,
    current_user: dict = Depends(get_current_user)
):
    """Score and store a completed assessment submission."""
    # Build lookup for correct answers
    question_map = {q["id"]: q for q in ASSESSMENT_QUESTIONS}

    # Score each answer
    section_correct = {}
    section_total = {}
    scored_answers = []

    for answer in submission.answers:
        q = question_map.get(answer.question_id)
        if not q:
            continue

        section = q["section"]
        if section not in section_correct:
            section_correct[section] = 0
            section_total[section] = 0

        section_total[section] += 1

        is_correct = None
        if q["correct_answer"] is not None:
            is_correct = answer.selected_option == q["correct_answer"]
            if is_correct:
                section_correct[section] += 1
        else:
            # Subjective questions — credit any answer
            section_correct[section] += 1

        scored_answers.append({
            "question_id": answer.question_id,
            "selected_option": answer.selected_option,
            "is_correct": is_correct,
            "section": section,
        })

    # Calculate section scores as percentages
    section_scores = {}
    for section in section_total:
        section_scores[section] = round(
            (section_correct[section] / section_total[section]) * 100, 1
        )

    total_score = round(
        sum(section_scores.values()) / len(section_scores), 1
    ) if section_scores else 0

    # Store result in MongoDB
    result_doc = {
        "student_email": current_user["email"],
        "answers": scored_answers,
        "section_scores": section_scores,
        "total_score": total_score,
        "completed_at": datetime.now(timezone.utc),
        "status": "completed",
    }

    # Upsert — replace previous assessment
    await assessments_collection.update_one(
        {"student_email": current_user["email"]},
        {"$set": result_doc},
        upsert=True
    )

    return {
        "message": "Assessment submitted successfully!",
        "section_scores": section_scores,
        "total_score": total_score,
    }
