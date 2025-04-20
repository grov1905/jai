
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

        # Configuración de PostgreSQL
    PGUSER: str = "jai_user"  # Valor por defecto
    PGPASSWORD: str
    PGHOST: str = "db"
    PGPORT: str = "5432"
    PGDATABASE: str = "jai_db"


     # Configuración de embeddings
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"
    CHUNK_SIZE: int = 100
    CHUNK_OVERLAP: int = 20
    EMBEDDING_DIM: int = 384  # valor por defecto


    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()


