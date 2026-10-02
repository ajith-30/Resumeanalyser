import pytest
from app.services.skill_extractor import extract_skills, analyze_skill_gap

def test_extract_skills():
    resume_text = "Senior Software Engineer proficient in Java, Spring Boot, SQL, AWS, and React."
    extracted = extract_skills(resume_text)
    assert "Java" in extracted["all_skills"]
    assert "Spring Boot" in extracted["all_skills"]
    assert "React" in extracted["all_skills"]
    assert "AWS" in extracted["all_skills"]

def test_skill_gap_analysis():
    resume_text = "Backend developer with Java, Spring Boot, SQL, AWS, and React."
    jd_text = "Looking for Senior Backend Developer with Java, Spring Boot, SQL, AWS, React, Docker, Kubernetes."
    
    skills_found, missing_skills, detailed = analyze_skill_gap(resume_text, jd_text)
    
    assert "Java" in skills_found
    assert "Spring Boot" in skills_found
    assert "Docker" in missing_skills
    assert "Kubernetes" in missing_skills
