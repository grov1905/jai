from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from app.schemas.embedding import SearchRequest, SearchResult
from app.db.database import get_db
from app.crud.crud_embedding import search_similar_embeddings
from app.core.config import settings  # Importa los ajustes de configuración
from typing import List
from sentence_transformers import SentenceTransformer

# Carga el modelo de embeddings desde el archivo .env
model = SentenceTransformer(settings.EMBEDDING_MODEL)

router = APIRouter()

@router.post("/search", response_model=List[SearchResult])
async def search_embeddings(
    request: SearchRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        results = await search_similar_embeddings(db, request.query, request.top_k)
        return results
    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Error en la base de datos al realizar la búsqueda semántica"
        )
    except Exception as e:
        logger.error(f"Search error - Query: {request.query} - Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error procesando la búsqueda: {str(e)}"
        )