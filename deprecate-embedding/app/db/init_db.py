# app/db/init_db.py
import asyncio
from app.db.session import engine
from app.models.embedding import Base

async def init():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init())
