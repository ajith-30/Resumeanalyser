from typing import List, Dict, Any
from ..models.schemas import SuggestionItem

def generate_resume_suggestions(
    resume_text: str,
    jd_text: str,
    missing_skills: List[str],
    metrics: Dict[str, Any]
) -> List[SuggestionItem]:
    """
    Generate actionable, prioritized resume improvement suggestions with tailored bullet points.
    """
    suggestions: List[SuggestionItem] = []
    sug_id = 1

    # 1. Missing Critical Skills Suggestion
    if missing_skills:
        top_missing = missing_skills[:3]
        skills_str = ", ".join(top_missing)
        suggestions.append(SuggestionItem(
            id=sug_id,
            priority="High",
            category="Skills Gap",
            title=f"Add missing core technologies: {skills_str}",
            description=f"The job description heavily emphasizes {skills_str}. Adding project context or experience with these will significantly boost your ATS keyword score.",
            actionable_bullet=f"• Designed and implemented microservices using {top_missing[0] if len(top_missing) > 0 else 'Docker'}, ensuring high availability and containerized deployment."
        ))
        sug_id += 1

    # 2. Measurable Metrics & Impact Suggestion
    if not any(char in resume_text for char in ['%', '$', 'increased', 'reduced', 'improved', 'optimized', 'ms', 'users']):
        suggestions.append(SuggestionItem(
            id=sug_id,
            priority="High",
            category="Impact & Metrics",
            title="Incorporate measurable project outcomes and quantitative metrics",
            description="Recruiters and ATS systems favor bullet points with quantifiable results (e.g., latency reduction, user scale, revenue growth).",
            actionable_bullet="• Optimized database query performance by 40%, reducing API response time from 350ms to 120ms for over 50,000 daily active users."
        ))
        sug_id += 1

    # 3. Architecture & API experience suggestion
    lowered_resume = resume_text.lower()
    if "rest" not in lowered_resume and "api" not in lowered_resume:
        suggestions.append(SuggestionItem(
            id=sug_id,
            priority="Medium",
            category="Architecture",
            title="Highlight REST API & system design experience",
            description="Explicitly detail API integration, endpoint security, and backend request handling.",
            actionable_bullet="• Developed secure RESTful APIs with OpenAPI/Swagger documentation, OAuth2 authentication, and rate limiting."
        ))
        sug_id += 1

    # 4. Cloud / AWS Projects suggestion
    if "aws" in jd_text.lower() and "aws" not in lowered_resume:
        suggestions.append(SuggestionItem(
            id=sug_id,
            priority="Medium",
            category="Cloud Infrastructure",
            title="Detail cloud infrastructure & AWS deployment experience",
            description="Mention specific AWS services (e.g., S3, EC2, Lambda, RDS) used in production or personal projects.",
            actionable_bullet="• Deployed containerized applications to AWS (EC2 & S3) with automated CI/CD pipelines, lowering hosting costs by 25%."
        ))
        sug_id += 1

    # 5. Technical Keywords formatting suggestion
    if metrics.get("keyword_match", 0) < 75:
        suggestions.append(SuggestionItem(
            id=sug_id,
            priority="Low",
            category="Format & ATS",
            title="Create a dedicated 'Technical Skills' section near top of resume",
            description="Organize skills by domain (Languages, Frameworks, Cloud, Databases) at the header to ensure immediate scanner parsing.",
            actionable_bullet="Core Competencies: Languages (Java, Python), Backend (Spring Boot, FastAPI, REST APIs), Cloud (AWS, Docker), Databases (PostgreSQL, Redis)"
        ))
        sug_id += 1

    return suggestions
