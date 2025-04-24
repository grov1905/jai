from app.services.extractors.csv import CSVExtractor
from fastapi import UploadFile
from io import BytesIO

def test_csv_extractor():
    content = b"nombre,edad\nJuan,30\nMaria,25"
    file = UploadFile(filename="test.csv", file=BytesIO(content))
    extractor = CSVExtractor()
    result = extractor.extract_text(file)
    assert "Juan" in result and "Maria" in result
