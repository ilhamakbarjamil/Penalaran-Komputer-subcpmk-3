from __future__ import annotations
import re

def normalize_space(text: str) -> str:
    text = str(text).replace("\x0c", "\n")
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    text = re.sub(r"\n+", "\n", text)
    return text.strip()

def clean_for_model(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"[^a-zA-Z0-9\s./,-]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def remove_boilerplate(text: str) -> str:
    text = text.replace("Direktori Putusan Mahkamah Agung Republik Indonesia", " ")
    text = text.replace("putusan.mahkamahagung.go.id", " ")
    text = re.sub(r"Mahkamah Agung Republik Indonesia", " ", text, flags=re.I)
    text = re.sub(
        r"Disclaimer\s*Kepaniteraan.*?Email\s*:\s*kepaniteraan@mahkamahagung\.go\.id\s*Telp\s*:\s*021-384\s*3348\s*\(ext\.318\)",
        " ", text, flags=re.I | re.S
    )
    text = re.sub(r"Halaman\s+\d+\s+dari\s+\d+\s+Putusan\s+Nomor\s+[^\n]+", " ", text, flags=re.I)
    text = re.sub(r"Halaman\s+\d+", " ", text, flags=re.I)
    return normalize_space(text)
