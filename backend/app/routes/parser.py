from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services.pdf_parser import parse_file
from ..models.schemas import ParseResumeResponse, ParseTextRequest
from ..utils.text_cleaner import clean_text, extract_contact_info

router = APIRouter(prefix="/parse", tags=["Resume & JD Parser"])

@router.post("/file", response_model=ParseResumeResponse)
async def parse_uploaded_file(file: UploadFile = File(...)):
    """Upload PDF, DOCX, or TXT file and extract structured text."""
    try:
        content = await file.read()
        parsed = parse_file(content, file.filename)
        return ParseResumeResponse(**parsed)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse uploaded file: {str(e)}")

@router.post("/text", response_model=ParseResumeResponse)
async def parse_raw_text(payload: ParseTextRequest):
    """Parse raw text string."""
    raw = payload.text
    cleaned = clean_text(raw)
    contact = extract_contact_info(raw)
    words = cleaned.split()
    
    return ParseResumeResponse(
        filename="pasted_text.txt",
        file_type="TXT",
        raw_text=raw,
        cleaned_text=cleaned,
        word_count=len(words),
        char_count=len(cleaned),
        email=contact.get("email"),
        phone=contact.get("phone"),
        links=contact.get("links", [])
    )
