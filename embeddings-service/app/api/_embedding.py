from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.db.database import get_db
from app.services.embedders.embedding_generator import generate_embeddings
from app.schemas.embedding import (
    EmbeddingSavedResponse,
    EmbeddingCreate,
    EmbeddingRead,
    EmbeddingUpdate,
    EmbeddingResponse,
    EmbeddingRequest
)
from app.crud import crud_embedding

router = APIRouter()

@router.post("/embedding", response_model=EmbeddingResponse)
async def embedding_endpoint(request: EmbeddingRequest):

    vectors = generate_embeddings(request.texts)
    
    return {"embeddings": vectors}

@router.post("/embeddings", response_model=EmbeddingRead)
async def create_embedding(
    embedding_data: EmbeddingCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        embedding = await crud_embedding.create_embedding(db, embedding_data)
        if not embedding:
            raise HTTPException(status_code=500, detail="Failed to create embedding")
        return embedding
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/embeddings/{embedding_id}", response_model=EmbeddingRead)
async def get_embedding_by_id(
    embedding_id: int,
    db: AsyncSession = Depends(get_db)
):
    embedding = await crud_embedding.get_embedding_by_id(db, embedding_id)
    if not embedding:
        raise HTTPException(status_code=404, detail="Embedding not found")
    return embedding

@router.get("/embeddings", response_model=List[EmbeddingRead])
async def get_embeddings_by_content(
    keyword: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    if keyword:
        return await crud_embedding.get_embeddings_by_content(db, keyword)
    return []

@router.put("/embeddings/{embedding_id}", response_model=EmbeddingRead)
async def update_embedding(
    embedding_id: int,
    update_data: EmbeddingUpdate,
    db: AsyncSession = Depends(get_db)
):
    updated = await crud_embedding.update_embedding(db, embedding_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Embedding not found or not updated")
    return updated

@router.delete("/embeddings/{embedding_id}")
async def delete_embedding(
    embedding_id: int,
    db: AsyncSession = Depends(get_db)
):
    success = await crud_embedding.delete_embedding(db, embedding_id)
    if not success:
        raise HTTPException(status_code=404, detail="Embedding not found or not deleted")
    return {"detail": "Embedding deleted successfully"}

@router.post("/embedding/save", response_model=EmbeddingSavedResponse)
async def save_embeddings(
    request: EmbeddingRequest,
    db: AsyncSession = Depends(get_db)
):
    vectors = generate_embeddings(request.texts)
    ids = []

    for text, vector in zip(request.texts, vectors):
        db_obj = await crud_embedding.create_embedding(
            db=db,
            text=text,
            embedding=vector
        )
        ids.append(db_obj.id)

    return EmbeddingSavedResponse(ids=ids)