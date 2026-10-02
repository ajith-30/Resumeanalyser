from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routes import parser, analyzer, interview

# Initialize database tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning initializing DB tables: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Resume Analyzer & Job Matcher API"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(parser.router, prefix=settings.API_V1_STR)
app.include_router(analyzer.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Resume Matcher & Analyzer API",
        "docs_url": "/docs",
        "version": settings.VERSION,
        "status": "healthy"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}
