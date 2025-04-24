from app.services.extractors.txt import TxtExtractor
from fastapi import UploadFile
from io import BytesIO

def test_txt_extractor():
    content = b"Este es un archivo de prueba en texto plano."
    file = UploadFile(filename="test.txt", file=BytesIO(content))
    extractor = TxtExtractor()
    result = extractor.extract_text(file)
    assert "archivo de prueba" in result
