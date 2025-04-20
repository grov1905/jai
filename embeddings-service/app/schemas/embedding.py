from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from core.config import settings  # Importa tu configuración

class EmbeddingBase(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class EmbeddingRequest(BaseModel):
    texts: List[str] = Field(..., description="Lista de textos a convertir en embeddings")

class EmbeddingResponse(BaseModel):
    embeddings: List[List[float]] = Field(..., description="Vectores de embeddings generados")

class EmbeddingSavedResponse(BaseModel):
    ids: List[int] = Field(..., description="IDs de los embeddings guardados en DB")

class EmbeddingCreate(EmbeddingBase):
    content: str = Field(..., max_length=5000, alias="chunk")
    # Cambia de 384 a 1024 dimensiones:
    embedding: List[float] = Field(..., min_items=settings.EMBEDDING_DIM, max_items=settings.EMBEDDING_DIM)

class EmbeddingRead(EmbeddingBase):
    id: int
    content: str = Field(..., alias="chunk")
    # Actualiza aquí también:
    embedding: List[float] = Field(..., min_items=settings.EMBEDDING_DIM, max_items=settings.EMBEDDING_DIM)

class EmbeddingUpdate(EmbeddingBase):
    content: Optional[str] = Field(None, alias="chunk")  # Mapea content a chunk
    embedding: Optional[List[float]] = None

class SearchRequest(BaseModel):
    query: str
    top_k: int = settings.EMBEDDING_DIM

class SearchResult(BaseModel):
    id: int
    chunk: str
    similarity: float