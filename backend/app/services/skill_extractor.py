import re
from typing import List, Dict, Set, Tuple, Any

# Comprehensive Tech & Soft Skills Database with Taxonomy
SKILL_TAXONOMY: Dict[str, Dict[str, List[str]]] = {
    "Languages": {
        "Python": [r"\bpython\b", r"\bpy\b"],
        "Java": [r"\bjava\b"],
        "JavaScript": [r"\bjavascript\b", r"\bjs\b", r"\bes6\b"],
        "TypeScript": [r"\btypescript\b", r"\bts\b"],
        "C++": [r"\bc\+\+\b", r"\bcpp\b"],
        "C#": [r"\bc#\b", r"\bcsharp\b", r"\b\.net\b"],
        "Go / Golang": [r"\bgolang\b", r"\bgo language\b"],
        "Rust": [r"\brust\b"],
        "PHP": [r"\bphp\b"],
        "Ruby": [r"\bruby\b"],
        "SQL": [r"\bsql\b", r"\btsql\b", r"\bplsql\b"],
        "HTML/CSS": [r"\bhtml5?\b", r"\bcss3?\b", r"\bsass\b", r"\bscss\b"]
    },
    "Frameworks & Libraries": {
        "Spring Boot": [r"\bspring boot\b", r"\bspring framework\b", r"\bspring\b"],
        "React": [r"\breact\b", r"\breactjs\b", r"\breact\.js\b"],
        "Angular": [r"\bangular\b", r"\bangularjs\b"],
        "Vue.js": [r"\bvue\b", r"\bvuejs\b", r"\bvue\.js\b"],
        "Next.js": [r"\bnextjs\b", r"\bnext\.js\b"],
        "FastAPI": [r"\bfastapi\b"],
        "Django": [r"\bdjango\b"],
        "Flask": [r"\bflask\b"],
        "Node.js": [r"\bnode\b", r"\bnodejs\b", r"\bnode\.js\b"],
        "Express.js": [r"\bexpress\b", r"\bexpressjs\b"],
        "Tailwind CSS": [r"\btailwind\b", r"\btailwindcss\b"],
        "Bootstrap": [r"\bbootstrap\b"],
        "Redux": [r"\bredux\b"]
    },
    "Cloud & DevOps": {
        "AWS": [r"\baws\b", r"\bamazon web services\b", r"\bec2\b", r"\bs3\b", r"\blambda\b"],
        "Docker": [r"\bdocker\b", r"\bcontainerization\b"],
        "Kubernetes": [r"\bkubernetes\b", r"\bk8s\b"],
        "Azure": [r"\bazure\b", r"\bmicrosoft azure\b"],
        "GCP": [r"\bgcp\b", r"\bgoogle cloud\b", r"\bgoogle cloud platform\b"],
        "CI/CD": [r"\bci/cd\b", r"\bjenkins\b", r"\bgithub actions\b", r"\bgitlab ci\b"],
        "Terraform": [r"\bterraform\b", r"\biac\b"],
        "Linux": [r"\blinux\b", r"\bubuntu\b", r"\bbash\b", r"\bshell scripting\b"]
    },
    "Databases & Storage": {
        "PostgreSQL": [r"\bpostgresql\b", r"\bpostgres\b"],
        "MySQL": [r"\bmysql\b"],
        "MongoDB": [r"\bmongodb\b", r"\bmongo\b"],
        "Redis": [r"\bredis\b"],
        "Oracle": [r"\boracle db\b", r"\boracle database\b"],
        "DynamoDB": [r"\bdynamodb\b"],
        "Elasticsearch": [r"\belasticsearch\b", r"\belk\b"]
    },
    "Architecture & Methodologies": {
        "REST API": [r"\brest\b", r"\brestful\b", r"\brest api\b", r"\bweb apis?\b"],
        "Microservices": [r"\bmicroservices?\b", r"\bmicroservice architecture\b"],
        "GraphQL": [r"\bgraphql\b"],
        "Agile / Scrum": [r"\bagile\b", r"\bscrum\b", r"\bkanban\b"],
        "System Design": [r"\bsystem design\b", r"\bscalable architecture\b"],
        "TDD / Testing": [r"\btdd\b", r"\bunit testing\b", r"\bjest\b", r"\bpytest\b", r"\bjunit\b"]
    },
    "Soft Skills & Leadership": {
        "Problem Solving": [r"\bproblem solving\b", r"\banalytical skills?\b"],
        "Communication": [r"\bcommunication\b", r"\binterpersonal\b"],
        "Team Leadership": [r"\bleadership\b", r"\bmentoring\b", r"\bteam lead\b"],
        "Project Management": [r"\bproject management\b", r"\bcross-functional\b"]
    }
}

def extract_skills(text: str) -> Dict[str, Any]:
    """
    Extract skills present in text, categorized by domain.
    Returns:
      - skills_by_category: { category: [SkillName, ...] }
      - all_skills: Set[SkillName]
      - skills_detail: [{ name, category }, ...]
    """
    if not text:
        return {"skills_by_category": {}, "all_skills": [], "skills_detail": []}

    lowered_text = text.lower()
    
    found_by_cat: Dict[str, List[str]] = {}
    all_skills_set: Set[str] = set()
    skills_detail: List[Dict[str, str]] = []

    for cat_name, skills_dict in SKILL_TAXONOMY.items():
        found_in_cat = []
        for skill_name, patterns in skills_dict.items():
            for pat in patterns:
                if re.search(pat, lowered_text, re.IGNORECASE):
                    if skill_name not in found_in_cat:
                        found_in_cat.append(skill_name)
                        all_skills_set.add(skill_name)
                        skills_detail.append({"name": skill_name, "category": cat_name})
                    break
        if found_in_cat:
            found_by_cat[cat_name] = found_in_cat

    return {
        "skills_by_category": found_by_cat,
        "all_skills": sorted(list(all_skills_set)),
        "skills_detail": skills_detail
    }

def analyze_skill_gap(resume_text: str, jd_text: str) -> Tuple[List[str], List[str], List[Dict[str, Any]]]:
    """
    Compare resume skills against job description skills.
    Returns:
      - skills_found (List of skill names present in both resume and JD)
      - missing_skills (List of skill names in JD but missing in resume)
      - detailed_comparison (List of objects with name, category, found: bool)
    """
    resume_skills = set(extract_skills(resume_text)["all_skills"])
    jd_skills_info = extract_skills(jd_text)
    jd_skills_set = set(jd_skills_info["all_skills"])
    
    # If job description mentions minimal explicit tech keywords from taxonomy,
    # extract candidate N-grams or dynamic words as fallback keywords
    if len(jd_skills_set) == 0:
        words = re.findall(r'\b[A-Za-z0-9+#.]+\b', jd_text)
        potential = [w.capitalize() for w in words if len(w) > 3 and w.lower() not in ['with', 'from', 'that', 'this', 'have', 'your', 'team']]
        jd_skills_set = set(potential[:10])

    skills_found = sorted(list(resume_skills.intersection(jd_skills_set)))
    missing_skills = sorted(list(jd_skills_set - resume_skills))
    
    # Detailed list for UI presentation
    detailed = []
    
    # Add matched skills
    for skill in skills_found:
        # find category
        cat = "General Technical"
        for detail in jd_skills_info["skills_detail"]:
            if detail["name"] == skill:
                cat = detail["category"]
                break
        detailed.append({
            "name": skill,
            "category": cat,
            "found": True,
            "importance": "required"
        })
        
    # Add missing skills
    for skill in missing_skills:
        cat = "General Technical"
        for detail in jd_skills_info["skills_detail"]:
            if detail["name"] == skill:
                cat = detail["category"]
                break
        detailed.append({
            "name": skill,
            "category": cat,
            "found": False,
            "importance": "required"
        })

    # Also list bonus skills present in resume but not explicitly in JD
    bonus_skills = resume_skills - jd_skills_set
    for skill in list(bonus_skills)[:4]:  # limit to top 4 extra skills
        detailed.append({
            "name": skill,
            "category": "Bonus Skill",
            "found": True,
            "importance": "optional"
        })

    return skills_found, missing_skills, detailed
