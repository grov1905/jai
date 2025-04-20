# chatbot/services/deepseek_service.py
import os
import logging
import aiohttp
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

class DeepSeekService:
    def __init__(self):
        self.api_key = os.getenv("DEEPSEEK_API_KEY")
        self.api_url = os.getenv("DEEPSEEK_API_URL", "https://api.deepseek.com/v1/chat/completions")
        self.model = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")

    async def get_response(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "Eres un asistente útil que responde de forma clara y concisa."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.7,
            "max_tokens": 500
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.api_url,
                    headers=headers,
                    json=payload,
                    timeout=30
                ) as response:
                    
                    if response.status != 200:
                        error = await response.text()
                        logger.error(f"Error de Deepseek: {error}")
                        return "Lo siento, hubo un error al procesar tu mensaje. Intenta nuevamente."
                    
                    data = await response.json()
                    return data['choices'][0]['message']['content'].strip()

        except aiohttp.ClientError as e:
            logger.error(f"Error de conexión con Deepseek: {e}")
            return "Problemas de conexión con el servicio. Intenta más tarde."
        except Exception as e:
            logger.exception("Error inesperado en Deepseek:")
            return "Se produjo un error inesperado. Por favor, intenta más tarde."