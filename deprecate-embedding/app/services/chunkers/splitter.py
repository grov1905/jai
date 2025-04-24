# app/services/chunkers/splitter.py
from typing import List
from app.core.config import settings

def split_text_into_chunks(text: str) -> List[str]:
    """
    Divide un texto en chunks según el tamaño y solapamiento definidos en .env
    """
    words = text.split()
    chunk_size = settings.CHUNK_SIZE
    overlap = settings.CHUNK_OVERLAP
    chunks = []

    for i in range(0, len(words), chunk_size - overlap):
        chunk = words[i:i + chunk_size]
        chunks.append(" ".join(chunk))

    return chunks
