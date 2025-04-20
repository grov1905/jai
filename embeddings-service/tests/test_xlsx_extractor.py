from app.services.extractors.xlsx import XlsxExtractor
from fastapi import UploadFile
from io import BytesIO
import pandas as pd

def test_xlsx_extractor():
    df = pd.DataFrame({"nombre": ["Ana", "Luis"], "edad": [28, 34]})
    buffer = BytesIO()
    with pd.ExcelWriter(buffer, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Hoja1", index=False)
    buffer.seek(0)
    file = UploadFile(filename="test.xlsx", file=buffer)
    extractor = XlsxExtractor()
    result = extractor.extract_text(file)
    assert "Ana" in result and "Luis" in result
