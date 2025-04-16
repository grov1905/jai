import os
import openai
import logging
from dotenv import load_dotenv

load_dotenv()

# Configurar la clave de API
openai.api_key = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")  # Por defecto usa gpt-3.5


# Configurar logs
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


async def get_openai_response(prompt: str) -> str:
    
    try:
        logger.info(f"Enviando mensajes a OpenAI. Modelo: {MODEL}")
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres un asistente útil que responde de forma clara y concisa."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        logger.info("Respuesta recibida correctamente desde OpenAI")
        return response.choices[0].message["content"].strip()

    except openai.error.OpenAIError as e:
        logger.error(f"Error de OpenAI: {e}")
        return "Lo siento, hubo un error al procesar tu mensaje. Intenta nuevamente."
    
    except Exception as e:
        logger.exception("Error inesperado en get_chatgpt_response:")
        return "Se produjo un error inesperado. Por favor, intenta más tarde."