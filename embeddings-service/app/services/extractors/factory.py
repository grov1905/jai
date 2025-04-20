from fastapi import UploadFile
from .pdf import PDFExtractor
from .docx import DocxExtractor
from .txt import TxtExtractor
from .csv import CSVExtractor
from .xlsx import XLSXExtractor

def get_extractor(file: UploadFile) -> 'BaseExtractor':
    if not file.filename:
        raise ValueError("No filename provided")
    
    filename = file.filename.lower()
    content_type = file.content_type or ""

    if filename.endswith(".pdf") or "pdf" in content_type:
        return PDFExtractor()
    elif filename.endswith(".docx") or "word" in content_type:
        return DocxExtractor()
    elif filename.endswith(".txt") or "text/plain" in content_type:
        return TxtExtractor()
    elif filename.endswith(".csv") or "csv" in content_type:
        return CSVExtractor()
    elif filename.endswith(".xlsx") or "spreadsheet" in content_type:
        return XLSXExtractor()
    else:
        raise ValueError(f"Unsupported file type: {filename}")