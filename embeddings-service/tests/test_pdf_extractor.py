from app.services.extractors.pdf import PDFExtractor
from fastapi import UploadFile
from io import BytesIO
import fitz  # PyMuPDF

def test_pdf_extractor():
    buffer = BytesIO()
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((72, 72), "Texto de prueba en PDF.")
    doc.save(buffer)
    doc.close()
    buffer.seek(0)
    
    # Obtén los bytes del buffer
    pdf_bytes = buffer.getvalue()
    
    extractor = PDFExtractor()
    result = extractor.extract_text(pdf_bytes)  # Pasa los bytes directamente
    assert "Texto de prueba en PDF." in result
