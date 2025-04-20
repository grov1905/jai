from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.cleaners.text_cleaner import clean_text

router = APIRouter()

class CleanRequest(BaseModel):
    text: str

class CleanResponse(BaseModel):
    cleaned_text: str

@router.post("/clean", response_model=CleanResponse)
async def clean_endpoint(request: CleanRequest):
    try:
        cleaned = clean_text(request.text)
        return {"cleaned_text": cleaned}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
