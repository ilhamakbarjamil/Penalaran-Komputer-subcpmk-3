import re
from pathlib import Path


def clean_text(text: str) -> str:
    """
    Clean Indonesian court decision text.
    """
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"halaman\s+\d+", " ", text)
    text = re.sub(r"putusan\s+mahkamah\s+agung", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s./-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def save_text(text: str, output_path: str):
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(text, encoding="utf-8")


def read_text(file_path: str) -> str:
    return Path(file_path).read_text(encoding="utf-8", errors="ignore")
