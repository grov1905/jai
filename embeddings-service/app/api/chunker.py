# app/api/chunker.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.services.chunkers.splitter import split_text_into_chunks

router = APIRouter()

class ChunkRequest(BaseModel):
    text: str  # ❌ quitamos chunk_size y chunk_overlap

class ChunkResponse(BaseModel):
    chunks: List[str]

@router.post("/chunk", response_model=ChunkResponse)
async def chunk_endpoint(request: ChunkRequest):
    try:
        chunks = split_text_into_chunks(text=request.text)
        return {"chunks": chunks}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
