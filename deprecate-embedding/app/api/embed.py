# app/api/embed.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.embedding import EmbeddingRequest
from app.crud.crud_embedding import create_embedding

router = APIRouter()

@router.post("/embed", status_code=201)
async def embed_and_store(request: EmbeddingRequest, db: AsyncSession = Depends(get_db)):
    """
    Recibe una lista de chunks y embeddings, y los guarda en la base de datos.
    """
    try:
        embeddings = []
        for text, vector in zip(request.texts, request.embeddings):
            embedding_data = {
                "content": text,
                "embedding": vector
            }
            db_embedding = await create_embedding(db=db, embedding_data=embedding_data)
            embeddings.append(db_embedding)

        return {"message": "Embeddings guardados correctamente.", "data": embeddings}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al guardar embeddings: {str(e)}")
