import io
from docx import Document
from app.services.cleaners.text_cleaner import clean_text
from .base import BaseExtractor

class DocxExtractor(BaseExtractor):
    def extract_text(self, file_bytes: bytes) -> str:
        try:
            document = Document(io.BytesIO(file_bytes))
            return clean_text("\n".join(para.text for para in document.paragraphs))
        except Exception as e:
            raise ValueError(f"Error processing DOCX: {str(e)}")