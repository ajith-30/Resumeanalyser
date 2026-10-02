from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime
import uuid

from ..database import get_db
from ..models.schemas import AnalysisRequest, AnalysisResponse, MetricBreakdown, AnalysisHistoryItem
from ..models.db_models import AnalysisRecord
from ..services.similarity_engine import calculate_similarity_metrics
from ..services.ai_suggester import generate_resume_suggestions
from ..services.interview_generator import generate_interview_questions

router = APIRouter(prefix="/analyze", tags=["Analyzer"])

@router.post("", response_model=AnalysisResponse)
async def analyze_resume_and_jd(
    payload: AnalysisRequest,
    db: Session = Depends(get_db)
):
    """
    Core AI Analysis Endpoint:
    Analyzes resume against job description, extracts skills, calculates match metrics,
    generates improvement suggestions and interview questions.
    """
    resume_text = payload.resume_text.strip()
    jd_text = payload.job_description.strip()

    if not resume_text or not jd_text:
        raise HTTPException(
            status_code=400,
            detail="Both resume text and job description must be provided."
        )

    target_role = payload.target_role or "Software Engineer"

    # 1. Calculate similarity and skill gap metrics
    metrics_data = calculate_similarity_metrics(resume_text, jd_text)
    
    metrics = MetricBreakdown(
        overall_match=metrics_data["overall_match"],
        keyword_match=metrics_data["keyword_match"],
        technical_match=metrics_data["technical_match"],
        soft_skills_match=metrics_data["soft_skills_match"],
        experience_match=metrics_data["experience_match"]
    )

    # 2. Generate improvement suggestions
    suggestions = generate_resume_suggestions(
        resume_text=resume_text,
        jd_text=jd_text,
        missing_skills=metrics_data["missing_skills"],
        metrics=metrics_data
    )

    # 3. Generate interview questions
    interview_questions = generate_interview_questions(
        resume_text=resume_text,
        jd_text=jd_text,
        skills_found=metrics_data["skills_found"],
        missing_skills=metrics_data["missing_skills"]
    )

    # 4. Summary message
    skills_count = len(metrics_data["skills_found"])
    missing_count = len(metrics_data["missing_skills"])
    summary = (
        f"Analysis complete for {target_role}. Identified {skills_count} matching skill(s) "
        f"and {missing_count} missing requirement(s). Overall match rating is {metrics.overall_match}% ({metrics.experience_match} match)."
    )

    # 5. Save to Database
    db_record = AnalysisRecord(
        target_role=target_role,
        resume_preview=resume_text[:300],
        job_preview=jd_text[:300],
        overall_match=metrics.overall_match,
        keyword_match=metrics.keyword_match,
        technical_match=metrics.technical_match,
        experience_match=metrics.experience_match,
        skills_found=metrics_data["skills_found"],
        missing_skills=metrics_data["missing_skills"],
        suggestions=[s.model_dump() for s in suggestions],
        interview_questions=[q.model_dump() for q in interview_questions]
    )
    
    try:
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        record_id = str(db_record.id)
    except Exception:
        db.rollback()
        record_id = str(uuid.uuid4())[:8]

    return AnalysisResponse(
        analysis_id=record_id,
        timestamp=datetime.now(),
        target_role=target_role,
        metrics=metrics,
        skills_found=metrics_data["skills_found"],
        missing_skills=metrics_data["missing_skills"],
        skills_detailed=metrics_data["skills_detailed"],
        suggestions=suggestions,
        interview_questions=interview_questions,
        summary=summary
    )

@router.get("/history", response_model=List[AnalysisHistoryItem])
async def get_analysis_history(db: Session = Depends(get_db)):
    """Fetch past analysis records from database."""
    records = db.query(AnalysisRecord).order_by(AnalysisRecord.created_at.desc()).limit(20).all()
    return records
