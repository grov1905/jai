import pandas as pd
import io
from .base import BaseExtractor
from app.services.cleaners.text_cleaner import clean_text

class XLSXExtractor(BaseExtractor):
    def extract_text(self, file_bytes: bytes) -> str:
        try:
            dfs = pd.read_excel(io.BytesIO(file_bytes), sheet_name=None)
            result = []
            for sheet_name, df in dfs.items():
                result.append(f"Sheet: {sheet_name}\n{df.to_string(index=False)}")
            return clean_text("\n\n".join(result))
        except Exception as e:
            raise ValueError(f"Error processing XLSX: {str(e)}")