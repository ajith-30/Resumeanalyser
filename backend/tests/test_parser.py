import pytest
from app.utils.text_cleaner import clean_text, extract_contact_info

def test_clean_text():
    sample = "  Hello   World!\r\n\t  This is   a test. "
    cleaned = clean_text(sample)
    assert cleaned == "Hello World! This is a test."

def test_extract_contact_info():
    sample = "Contact me at alex.dev@example.com or +1 (555) 019-2834. Portfolio: https://github.com/alexdev"
    info = extract_contact_info(sample)
    assert info["email"] == "alex.dev@example.com"
    assert "github.com/alexdev" in info["links"][0]
