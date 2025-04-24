#embeddings-service/app/main.py
from fastapi import FastAPI
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db, engine
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.db.base import Base  # Base centralizada
from app.models.embedding import Embedding  # Importa el modelo para que se registre
from sqlalchemy import text

app = FastAPI()
# Importa routers al final para evitar dependencias circulares
from app.api import chunker, upload, clean, _embedding
from app.api.routes import s_embedding

app.include_router(upload.router, prefix="/api")
app.include_router(clean.router, prefix="/api")
app.include_router(chunker.router, prefix="/api")
app.include_router(_embedding.router, prefix="/api")
app.include_router(s_embedding.router, prefix="/api/embeddings", tags=["embeddings"])


@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/bd")
async def some_endpoint(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(text("SELECT * FROM public.chat_message"))
        return {"data": result.mappings().all()}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")


@app.on_event("startup")
async def on_startup():
    print("Creando tablas...")
    async with engine.begin() as conn:
        # 1. Activa pgvector si no existe
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        # 2. Crea las tablas
        await conn.run_sync(Base.metadata.create_all)
    print("Tablas creadas correctamente.")