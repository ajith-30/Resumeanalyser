from fastapi import APIRouter
from typing import List
from ..models.schemas import InterviewQuestion, AnalysisRequest
from ..services.skill_extractor import analyze_skill_gap
from ..services.interview_generator import generate_interview_questions

router = APIRouter(prefix="/interview", tags=["Interview Questions"])

@router.post("/generate", response_model=List[InterviewQuestion])
async def generate_questions_standalone(payload: AnalysisRequest):
    """Generate interview questions for specific resume and job description."""
    skills_found, missing_skills, _ = analyze_skill_gap(payload.resume_text, payload.job_description)
    return generate_interview_questions(
        resume_text=payload.resume_text,
        jd_text=payload.job_description,
        skills_found=skills_found,
        missing_skills=missing_skills
    )
