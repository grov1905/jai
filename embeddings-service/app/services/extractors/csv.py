import pandas as pd
from app.services.cleaners.text_cleaner import clean_text

import io
from .base import BaseExtractor

class CSVExtractor(BaseExtractor):
    def extract_text(self, file_bytes: bytes) -> str:
        try:
            df = pd.read_csv(io.BytesIO(file_bytes))
            return clean_text(df.to_string(index=False))        
        except Exception as e:
            raise ValueError(f"Error processing CSV: {str(e)}")