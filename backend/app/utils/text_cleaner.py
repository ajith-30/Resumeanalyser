import re
from typing import List, Dict, Tuple

def clean_text(text: str) -> str:
    """Clean raw text extracted from PDFs or user input."""
    if not text:
        return ""
    
    # Standardize whitespace and remove unusual unicode chars
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # remove non-ascii
    text = re.sub(r'\s+', ' ', text)  # normalize multiple spaces
    return text.strip()

def extract_contact_info(text: str) -> Dict[str, any]:
    """Extract email, phone, and links from text."""
    email_pattern = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
    phone_pattern = r'\(?\+?[0-9]{1,4}\)?[-.\s]?\(?[0-9]{1,3}\)?[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}'
    link_pattern = r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+[^\s]*|linkedin\.com/in/[a-zA-Z0-9_-]+|github\.com/[a-zA-Z0-9_-]+'
    
    emails = re.findall(email_pattern, text)
    phones = re.findall(phone_pattern, text)
    links = re.findall(link_pattern, text)
    
    return {
        "email": emails[0] if emails else None,
        "phone": phones[0] if phones else None,
        "links": list(set(links))
    }

def tokenize_and_normalize(text: str) -> List[str]:
    """Tokenize text into lowercased clean words."""
    cleaned = clean_text(text).lower()
    words = re.findall(r'\b[a-z0-9+#.]+\b', cleaned)
    return words
