from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from ..database import Base

class AnalysisRecord(Base):
    __tablename__ = "analysis_records"

    id = Column(Integer, primary_key=True, index=True)
    target_role = Column(String(255), index=True, default="Software Engineer")
    resume_preview = Column(Text, nullable=True)
    job_preview = Column(Text, nullable=True)
    overall_match = Column(Integer)
    keyword_match = Column(Integer)
    technical_match = Column(Integer)
    experience_match = Column(String(50))
    skills_found = Column(JSON)
    missing_skills = Column(JSON)
    suggestions = Column(JSON)
    interview_questions = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
