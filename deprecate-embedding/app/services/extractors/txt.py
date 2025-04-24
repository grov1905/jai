from .base import BaseExtractor
from app.services.cleaners.text_cleaner import clean_text

class TxtExtractor(BaseExtractor):
    def extract_text(self, file_bytes: bytes) -> str:
        try:
            return clean_text(file_bytes.decode("utf-8", errors="ignore"))
        except Exception as e:
            raise ValueError(f"Error processing TXT: {str(e)}")