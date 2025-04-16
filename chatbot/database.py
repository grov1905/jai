# chatbot/database.py

from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI
import os

# Función para conectar la BD con FastAPI usando Tortoise ORM
def init_db(app: FastAPI):
    register_tortoise(
        app,
        db_url="postgres://{user}:{password}@{host}:{port}/jai_chatbotdb".format(
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            host=os.getenv("PGHOST"),
            port="5432",
            database=os.getenv("PGDATABASE")
        ),
        modules={"models": ["models"]},
        generate_schemas=True,
        add_exception_handlers=True,
    )

async def init():
    await Tortoise.init(
       db_url="postgres://{user}:{password}@{host}:{port}/jai_chatbotdb".format(
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD"),
            host=os.getenv("PGHOST"),
            port="5432",
            database=os.getenv("PGDATABASE")
        ),
        modules={"models": ["models"]},
)

    await Tortoise.generate_schemas()

