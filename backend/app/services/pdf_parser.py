import io
from typing import Tuple, Dict, Any
from pypdf import PdfReader
import pdfplumber
import docx
from ..utils.text_cleaner import clean_text, extract_contact_info

def parse_file(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Parse upload file bytes based on file extension (.pdf, .docx, .txt).
    Returns dict with raw_text, cleaned_text, word_count, char_count, contact info.
    """
    ext = filename.lower().split('.')[-1] if '.' in filename else ''
    raw_text = ""
    
    if ext == 'pdf':
        raw_text = parse_pdf(file_bytes)
    elif ext in ['docx', 'doc']:
        raw_text = parse_docx(file_bytes)
    else:
        # fallback text
        raw_text = file_bytes.decode('utf-8', errors='ignore')
        
    cleaned = clean_text(raw_text)
    contact = extract_contact_info(raw_text)
    
    words = cleaned.split()
    
    return {
        "filename": filename,
        "file_type": ext.upper(),
        "raw_text": raw_text,
        "cleaned_text": cleaned,
        "word_count": len(words),
        "char_count": len(cleaned),
        "email": contact.get("email"),
        "phone": contact.get("phone"),
        "links": contact.get("links", [])
    }

def parse_pdf(file_bytes: bytes) -> str:
    """Try pypdf first, then pdfplumber fallback."""
    text = ""
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
    except Exception:
        text = ""

    if not text.strip():
        try:
            with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
                for page in pdf.pages:
                    t = page.extract_text()
                    if t:
                        text += t + "\n"
        except Exception:
            pass
            
    return text

def parse_docx(file_bytes: bytes) -> str:
    """Parse Microsoft Word docx file bytes."""
    try:
        doc = docx.Document(io.BytesIO(file_bytes))
        full_text = []
        for para in doc.paragraphs:
            if para.text:
                full_text.append(para.text)
        return "\n".join(full_text)
    except Exception as e:
        return f"Error reading DOCX: {str(e)}"
