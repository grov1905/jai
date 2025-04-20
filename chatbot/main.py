#chatbot/main.py
from fastapi import FastAPI
from database import init
from dotenv import load_dotenv
import os
# Rutas
from routers import webhook
#from routers import webhook
#app.include_router(webhook.router)

# Cargar variables de entorno desde .env
load_dotenv()

# Opcional: Verificar que las variables están cargadas
""" print("🟢 Base de datos:", os.getenv("PGDATABASE"))
print("🟢 Twilio SID:", os.getenv("TWILIO_ACCOUNT_SID"))
print("🟢 OpenAI Key cargada:", "Sí" if os.getenv("OPENAI_API_KEY") else "No") """


# Crear instancia de la app
app = FastAPI(
    title="Chatbot MVP",
    version="1.0.0"
)

# Incluir rutas
app.include_router(webhook.router, prefix="/webhook", tags=["Webhook"])

# inicio database con Tortoise ORM
@app.on_event("startup")
async def startup():
    await init() 

@app.get("/")
async def root():
    return {"message": "Chatbot MVP está corriendo 🚀"}