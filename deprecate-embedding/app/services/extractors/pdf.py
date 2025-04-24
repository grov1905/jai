import fitz
from .base import BaseExtractor
from app.services.cleaners.text_cleaner import clean_text

class PDFExtractor(BaseExtractor):
    def extract_text(self, file_bytes: bytes) -> str:
        try:
            with fitz.open(stream=file_bytes, filetype="pdf") as doc:
                return clean_text("\n".join(page.get_text() for page in doc))
        except Exception as e:
            raise ValueError(f"Error processing PDF: {str(e)}")