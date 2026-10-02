import pytest
from app.services.similarity_engine import calculate_similarity_metrics

def test_similarity_metrics():
    resume_text = "Experienced software engineer specializing in Java, Spring Boot, SQL, AWS, and React microservices."
    jd_text = "We are seeking a Senior Developer with Java, Spring Boot, AWS, SQL, React, Docker, and Kubernetes."
    
    metrics = calculate_similarity_metrics(resume_text, jd_text)
    
    assert metrics["overall_match"] > 50
    assert "Java" in metrics["skills_found"]
    assert "Docker" in metrics["missing_skills"]
    assert metrics["experience_match"] in ["Excellent", "Good", "Moderate"]
