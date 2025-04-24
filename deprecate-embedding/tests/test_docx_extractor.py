from app.services.extractors.docx import DocxExtractor
from fastapi import UploadFile
from io import BytesIO
from docx import Document  # Esto es correcto si tienes python-docx instalado

def test_docx_extractor():
    doc = Document()
    doc.add_paragraph("Este es un documento DOCX de prueba.")
    buffer = BytesIO()
    doc.save(buffer)
    buffer.seek(0)
    file = UploadFile(filename="test.docx", file=buffer)
    extractor = DocxExtractor()
    result = extractor.extract_text(file)
    assert "documento DOCX" in result
