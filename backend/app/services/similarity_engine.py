import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, Any, Tuple
from .skill_extractor import analyze_skill_gap

def calculate_similarity_metrics(resume_text: str, jd_text: str) -> Dict[str, Any]:
    """
    Calculate semantic similarity, keyword match %, technical match %, and experience match rating.
    """
    if not resume_text.strip() or not jd_text.strip():
        return {
            "overall_match": 0,
            "keyword_match": 0,
            "technical_match": 0,
            "soft_skills_match": 0,
            "experience_match": "Gap",
            "skills_found": [],
            "missing_skills": [],
            "skills_detailed": []
        }

    # 1. TF-IDF & Cosine Similarity for overall text/keyword match
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = vectorizer.fit_transform([resume_text, jd_text])
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    
    # Scale cosine sim to 0 - 100 with baseline boost for non-zero overlap
    raw_keyword_match = min(100, int(cosine_sim * 100 * 1.6 + 20)) if cosine_sim > 0.05 else int(cosine_sim * 100)

    # 2. Skill Gap Analysis & Technical Match
    skills_found, missing_skills, detailed = analyze_skill_gap(resume_text, jd_text)
    
    total_jd_skills = len(skills_found) + len(missing_skills)
    if total_jd_skills > 0:
        tech_match_pct = int((len(skills_found) / total_jd_skills) * 100)
    else:
        tech_match_pct = raw_keyword_match

    # 3. Soft Skills Match calculation
    soft_found = [s for s in detailed if s["category"] == "Soft Skills & Leadership" and s["found"]]
    soft_missing = [s for s in detailed if s["category"] == "Soft Skills & Leadership" and not s["found"]]
    total_soft = len(soft_found) + len(soft_missing)
    soft_match_pct = int((len(soft_found) / total_soft) * 100) if total_soft > 0 else max(70, raw_keyword_match)

    # 4. Overall Weighted Score calculation
    # Weights: Technical match 50%, Keyword match 35%, Soft skills 15%
    overall_match = int(tech_match_pct * 0.50 + raw_keyword_match * 0.35 + soft_match_pct * 0.15)
    overall_match = max(10, min(99, overall_match))

    # 5. Experience Match classification
    exp_match = determine_experience_match(resume_text, jd_text, overall_match)

    return {
        "overall_match": overall_match,
        "keyword_match": raw_keyword_match,
        "technical_match": tech_match_pct,
        "soft_skills_match": soft_match_pct,
        "experience_match": exp_match,
        "skills_found": skills_found,
        "missing_skills": missing_skills,
        "skills_detailed": detailed
    }

def determine_experience_match(resume_text: str, jd_text: str, overall_score: int) -> str:
    """Classify experience match level: Excellent, Good, Moderate, or Needs Improvement."""
    # Find years of experience mentioned in resume vs JD
    resume_exp = extract_years_experience(resume_text)
    jd_exp = extract_years_experience(jd_text)

    if overall_score >= 80 and (resume_exp >= jd_exp or jd_exp == 0):
        return "Excellent"
    elif overall_score >= 70:
        return "Good"
    elif overall_score >= 50:
        return "Moderate"
    else:
        return "Gap Identified"

def extract_years_experience(text: str) -> int:
    """Extract max years of experience mentioned in text using regex."""
    matches = re.findall(r'(\d+)\+?\s*(?:years?|yrs?)\b', text, re.IGNORECASE)
    if matches:
        return max([int(m) for m in matches if int(m) < 40])
    return 0
