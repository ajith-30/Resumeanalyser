import os

try:
    # pyrefly: ignore [missing-import]
    from pydantic_settings import BaseSettings
except ImportError:
    try:
        from pydantic.v1 import BaseSettings  # type: ignore
    except ImportError:
        from pydantic import BaseSettings  # type: ignore

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Resume Matcher & Analyzer"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Environment
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./resume_matcher.db")
    
    # AI API keys (optional)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "")
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
