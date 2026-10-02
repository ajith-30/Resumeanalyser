from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class ParseTextRequest(BaseModel):
    text: str = Field(..., description="Raw text of resume or job description")

class ParseResumeResponse(BaseModel):
    filename: Optional[str] = None
    file_type: Optional[str] = None
    raw_text: str
    cleaned_text: str
    word_count: int
    char_count: int
    email: Optional[str] = None
    phone: Optional[str] = None
    links: List[str] = []

class SkillItem(BaseModel):
    name: str
    category: str
    found: bool
    importance: Optional[str] = "required" # required vs optional

class MetricBreakdown(BaseModel):
    overall_match: int
    keyword_match: int
    technical_match: int
    soft_skills_match: int
    experience_match: str # Good, Strong, Moderate, Gap

class SuggestionItem(BaseModel):
    id: int
    priority: str # High, Medium, Low
    category: str # Skills, Impact, Format, Experience
    title: str
    description: str
    actionable_bullet: Optional[str] = None

class InterviewQuestion(BaseModel):
    id: int
    category: str # Technical Gap, Deep Dive, Behavioral
    question: str
    reasoning: str
    sample_answer: str
    key_points: List[str]

class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str
    target_role: Optional[str] = None

class AnalysisResponse(BaseModel):
    analysis_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.now)
    target_role: str
    metrics: MetricBreakdown
    skills_found: List[str]
    missing_skills: List[str]
    skills_detailed: List[SkillItem]
    suggestions: List[SuggestionItem]
    interview_questions: List[InterviewQuestion]
    summary: str

class AnalysisHistoryItem(BaseModel):
    id: int
    target_role: str
    created_at: datetime
    overall_match: int
    keyword_match: int
    technical_match: int
    experience_match: str

    class Config:
        from_attributes = True
