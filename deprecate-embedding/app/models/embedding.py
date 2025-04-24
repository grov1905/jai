from app.db.base import Base  # Importa Base desde un único lugar
from sqlalchemy import Column, Integer, String
from pgvector.sqlalchemy import Vector
from app.core.config import settings

class Embedding(Base):
    __tablename__ = "embeddings"

    id = Column(Integer, primary_key=True, index=True)
    chunk = Column(String, nullable=False)
    embedding = Column(Vector(settings.EMBEDDING_DIM))