from typing import List
from ..models.schemas import InterviewQuestion

def generate_interview_questions(
    resume_text: str,
    jd_text: str,
    skills_found: List[str],
    missing_skills: List[str]
) -> List[InterviewQuestion]:
    """
    Generate tailored interview questions targeting candidate's skills and identified gaps.
    """
    questions: List[InterviewQuestion] = []
    q_id = 1

    # 1. Target Missing Skills (Deep Technical Questions)
    for skill in missing_skills[:2]:
        if skill.lower() in ['docker', 'kubernetes', 'k8s']:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Technical Gap",
                question=f"The job requires containerization experience with {skill}. How do you manage deployment rollbacks, health checks, and container networking?",
                reasoning=f"Identified gap: {skill} is required by the job description but not explicitly listed in your resume.",
                sample_answer=f"I structure multi-stage builds to keep image sizes lean, configure liveness and readiness probes to monitor health, and handle zero-downtime rolling updates.",
                key_points=["Multi-stage builds", "Liveness & readiness probes", "Rolling updates", "ConfigMaps/Environment variables"]
            ))
            q_id += 1
        elif skill.lower() in ['aws', 'azure', 'gcp', 'cloud']:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Technical Gap",
                question=f"How would you architect a fault-tolerant backend application deployed on {skill}?",
                reasoning=f"Cloud infrastructure with {skill} is a core requirement for this position.",
                sample_answer=f"I utilize multi-AZ deployments, load balancing (ALB), auto-scaling groups, and managed relational databases (RDS) with read replicas for resilience.",
                key_points=["Auto-scaling groups", "Load balancing", "Multi-AZ setup", "Managed secrets & IAM roles"]
            ))
            q_id += 1
        else:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Technical Gap",
                question=f"How would you quickly ramp up and apply {skill} if tasked with extending our current stack?",
                reasoning=f"{skill} is highlighted in the job post.",
                sample_answer=f"I systematically read official documentation, build a minimal proof-of-concept prototype within 48 hours, and analyze production best practices before integrating.",
                key_points=["Self-directed learning", "Rapid prototyping", "Best practices adherence", "Production safety"]
            ))
            q_id += 1

    # 2. Target Confirmed Strong Skills (Verification & Deep Dives)
    for skill in skills_found[:2]:
        if skill.lower() in ['java', 'spring boot', 'spring']:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Deep Dive",
                question="Can you explain how Spring Boot manages dependency injection and bean scopes, and how you resolve circular dependencies?",
                reasoning=f"Resume match: You listed {skill}. Interviewers will test core architectural knowledge.",
                sample_answer="Spring uses the ApplicationContext IoC container. Bean scopes include Singleton, Prototype, Request, and Session. Circular dependencies are best resolved using @Lazy annotation or refactoring into clean interfaces.",
                key_points=["IoC container & Bean lifecycles", "Singleton vs Prototype scope", "@Lazy initialization", "Constructor injection"]
            ))
            q_id += 1
        elif skill.lower() in ['react', 'next.js', 'typescript']:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Deep Dive",
                question="How do you optimize rendering performance in React and manage complex global state cleanly?",
                reasoning=f"Resume match: You listed {skill}.",
                sample_answer="I avoid unnecessary re-renders using React.memo, useMemo, and useCallback hooks, break down components into atomic units, and use Context API or Zustand/Redux for clean unidirectional data flow.",
                key_points=["Memoization (useMemo, useCallback)", "State lifting & atomic state", "Virtual DOM diffing", "Code splitting & lazy loading"]
            ))
            q_id += 1
        elif skill.lower() in ['sql', 'postgresql', 'mysql']:
            questions.append(InterviewQuestion(
                id=q_id,
                category="Deep Dive",
                question="How do you debug slow SQL queries and choose between indexing strategies (B-Tree, Hash, GIN)?",
                reasoning=f"Resume match: You listed {skill}.",
                sample_answer="I use EXPLAIN ANALYZE to evaluate query execution plans, look for sequential table scans, add composite B-Tree indexes for standard filters, and optimize JOIN conditions.",
                key_points=["EXPLAIN ANALYZE evaluation", "B-Tree vs Composite indexes", "Index selectivity", "Query refactoring & CTEs"]
            ))
            q_id += 1

    # 3. Behavioral & System Design Question
    questions.append(InterviewQuestion(
        id=q_id,
        category="Behavioral & System Design",
        question="Describe a complex technical challenge you faced in a previous project and how you evaluated trade-offs under tight deadlines.",
        reasoning="Standard high-leverage question to assess problem-solving, communication, and technical leadership.",
        sample_answer="In a previous project, we encountered unexpected API response latency under high load. I conducted performance profiling, evaluated caching with Redis vs database query refactoring, and implemented a 2-tier caching layer that cut P99 latency by 65%.",
        key_points=["STAR method structure (Situation, Task, Action, Result)", "Trade-off analysis", "Quantifiable result"]
    ))

    return questions
