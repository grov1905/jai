from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


# Usa create_async_engine con la URL correctamente formada
DATABASE_URL = f"postgresql+asyncpg://{settings.PGUSER}:{settings.PGPASSWORD}@{settings.PGHOST}:{settings.PGPORT}/{settings.PGDATABASE}"

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


