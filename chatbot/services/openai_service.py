""" #chatbot/services/deepseek_service.py

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


async def get_response(self, prompt: str, system_message: str = None, **kwargs) -> str:
    try:
        
        messages = [
               { system_message }
        ]
        logger.info(f"PROMPT A OPENAI : {messages}")

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=kwargs.get("temperature", 0.7),
            max_tokens=kwargs.get("max_tokens", 500)
        )
        logger.info(f"RESPUESTA DE OPENAI : {response.choices[0].message.content.strip()}")
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise AIServiceError(f"OpenAI Error: {str(e)}")
    
    
 """