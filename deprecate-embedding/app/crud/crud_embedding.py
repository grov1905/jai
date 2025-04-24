from typing import Union, Optional, Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.models.embedding import Embedding
from sqlalchemy import text
import numpy as np
from sentence_transformers import SentenceTransformer

from app.core.config import settings


import logging

model = SentenceTransformer(settings.EMBEDDING_MODEL)

logger = logging.getLogger(__name__)

async def create_embedding(
    db: AsyncSession, 
    embedding_data: Union[Dict[str, Any], 'EmbeddingCreate']
) -> Optional[Embedding]:
    try:
        if hasattr(embedding_data, 'model_dump'):
            embedding_data = embedding_data.model_dump(by_alias=True)  # Usa by_alias para mapeo
            
        db_embedding = Embedding(
            chunk=embedding_data.get("chunk"),  # Usa el nombre del campo real
            embedding=embedding_data.get("embedding")
        )
        db.add(db_embedding)
        await db.commit()
        await db.refresh(db_embedding)
        return db_embedding
    except SQLAlchemyError as e:
        logger.error(f"Error creating embedding: {e}")
        await db.rollback()
        return None

async def get_embedding_by_id(db: AsyncSession, embedding_id: int) -> Optional[Embedding]:
    try:
        result = await db.execute(
            select(Embedding).where(Embedding.id == embedding_id)
        )
        return result.scalar_one_or_none()
    except SQLAlchemyError as e:
        logger.error(f"Error fetching embedding by ID: {e}")
        return None

async def get_embeddings_by_content(db: AsyncSession, keyword: str) -> List[Embedding]:
    try:
        result = await db.execute(
            select(Embedding).where(Embedding.chunk.ilike(f"%{keyword}%"))  # Cambiado de content a chunk
        )
        return result.scalars().all()
    except SQLAlchemyError as e:
        logger.error(f"Error searching embeddings by content: {e}")
        return []

async def update_embedding(
    db: AsyncSession, 
    embedding_id: int, 
    update_data: Union[Dict[str, Any], 'EmbeddingUpdate']  # String type hint
) -> Optional[Embedding]:
    try:
        db_embedding = await get_embedding_by_id(db, embedding_id)
        if not db_embedding:
            return None
        
        if isinstance(update_data, dict):
            update_dict = update_data
        else:
            update_dict = update_data.model_dump(exclude_unset=True)
        
        if 'content' in update_dict:
            db_embedding.chunk = update_dict['content']  # Mapea content a chunk
        if 'embedding' in update_dict:
            db_embedding.embedding = update_dict['embedding']
            
        await db.commit()
        await db.refresh(db_embedding)
        return db_embedding
    except SQLAlchemyError as e:
        logger.error(f"Error updating embedding: {e}")
        await db.rollback()
        return None

async def delete_embedding(db: AsyncSession, embedding_id: int) -> bool:
    try:
        db_embedding = await get_embedding_by_id(db, embedding_id)
        if not db_embedding:
            return False
        await db.delete(db_embedding)
        await db.commit()
        return True
    except SQLAlchemyError as e:
        logger.error(f"Error deleting embedding: {e}")
        await db.rollback()
        return False

async def search_similar_embeddings(
    db: AsyncSession, 
    query: str, 
    top_k: int = 5
) -> List[dict]:
    try:
        # Generar embedding
        embedding_vector = model.encode(query).tolist()
        
        # Formatear correctamente el vector para PostgreSQL
        embedding_str = "[" + ",".join(str(x) for x in embedding_vector) + "]"
        
        # Query corregida (sin casting explícito)
        sql = text("""
            SELECT id, chunk, 
                   1 - (embedding <=> :embedding_vector) AS similarity
            FROM embeddings
            ORDER BY similarity DESC
            LIMIT :top_k
        """)

        result = await db.execute(sql, {
            "embedding_vector": embedding_str,
            "top_k": top_k
        })

        return [
            {
                "id": row.id, 
                "chunk": row.chunk, 
                "similarity": float(row.similarity)
            }
            for row in result
        ]

    except SQLAlchemyError as e:
        logger.error(f"Database error in semantic search: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error en la base de datos al realizar la búsqueda"
        )
    except Exception as e:
        logger.error(f"Unexpected error in semantic search: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error procesando la búsqueda: {str(e)}"
        )