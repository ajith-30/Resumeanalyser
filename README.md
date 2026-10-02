# 🚀 AI Resume Analyzer & Job Matcher

A state-of-the-art AI-powered web application that analyzes candidate resumes against job descriptions, computes semantic skill gaps, provides keyword and technical match scores, generates actionable resume improvement suggestions, and produces tailored interview questions.

![AI Resume Matcher](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20Python%20%7C%20PostgreSQL-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features

- 📄 **Resume PDF & DOCX Parsing**: Extract raw text, contact information, email, phone, and portfolio links from PDF, DOCX, and TXT files seamlessly.
- 🎯 **Skill Extraction & Gap Analysis**: Match candidate skills against job requirements using a comprehensive taxonomy dictionary (500+ skills in Languages, Frameworks, Cloud, Databases, DevOps, and Soft Skills).
- 📊 **Match Metrics & Scores**:
  - **Overall Match Rating**: Weighted score combining Technical Match, Keyword Cosine Similarity, and Experience Alignment.
  - **Keyword Match %**: Vectorized TF-IDF cosine similarity.
  - **Technical Match %**: Proportion of required job skills satisfied by candidate.
  - **Experience Alignment**: Automated classification (`Good`, `Strong`, `Moderate`, `Gap Identified`).
- 💡 **AI Resume Optimization Suggestions**: Actionable recommendations with copy-pasteable bullet points tailored to boost ATS performance.
- ❓ **Tailored Interview Question Generation**: Technical deep-dive and gap-assessment interview questions with sample model answers and evaluation points.
- 💾 **History & Analytics Storage**: Database records (SQLite/PostgreSQL) to trace past match evaluations over time.

---

## 🏗️ Repository Architecture

```
ai-resume-matcher/
│
├── frontend/                     # React + Vite + Vanilla CSS / Tailwind App
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── components/           # UI components (Header, ScoreCard, SkillBadge, Suggestions, InterviewQuestions)
│   │   ├── pages/                # Analysis Dashboard & History pages
│   │   ├── services/             # API client & local offline analysis fallback
│   │   ├── App.jsx               # Main React Application
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Design tokens, glassy UI theme, animations
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                      # Python FastAPI Application
│   ├── app/
│   │   ├── main.py               # FastAPI entry point & middleware
│   │   ├── config.py             # App settings & env loading
│   │   ├── database.py           # SQLAlchemy setup (Postgres/SQLite)
│   │   ├── routes/               # API routes (/parse, /analyze, /interview)
│   │   ├── services/             # PDF parser, skill extractor, TF-IDF engine, AI suggester
│   │   ├── models/               # Pydantic schemas & SQLAlchemy DB models
│   │   └── utils/                # Text cleaning & contact extraction
│   │
│   ├── tests/                    # Pytest suite
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment variables template
│   └── start.py                  # Standalone backend launcher
│
├── Dockerfile                    # Multi-stage production build
├── docker-compose.yml            # Containerized backend & Postgres database
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python start.py
```
Backend API will be live at: `http://localhost:8000`  
Swagger Documentation: `http://localhost:8000/docs`

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend Web UI will be live at: `http://localhost:5173`

---

## 🐳 Running with Docker

To run both backend and PostgreSQL in Docker containers:
```bash
docker-compose up --build
```

---

## 🧪 Running Backend Unit Tests

```bash
cd backend
pytest tests/
```

---

## 🚀 Deployment

- **Render / Railway / Heroku**: Use the included `Dockerfile` or connect repository directly. Set `PORT=8000`.
- **Database**: Supply `DATABASE_URL` for PostgreSQL or run using lightweight built-in SQLite.

---

## 📜 License
MIT License. Created for AI Resume Matcher & Job Matcher project.
