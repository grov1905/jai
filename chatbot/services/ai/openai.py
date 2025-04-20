
#chatbot/services/ai/apenai.py
import openai
from .base import AIProvider, AIServiceError
from dotenv import load_dotenv
import os

load_dotenv()

class OpenAIService(AIProvider):
    def __init__(self, model: str = "gpt-3.5-turbo"):
        super().__init__(model)
        self.client = openai.AsyncClient(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def get_response(self, prompt: str,system_message: str = None, **kwargs) -> str:
        try:
            default_system_message="""Eres un asistente empatico, asistente de un restaurante. 
        Características:
        - Servicial y conocedor del menú
        - Explica los platos claramente
        - Si no sabes algo, ofrécete a consultar con cocina, responde con mucha amabilidad"""
            
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                   {"role": "system", "content": system_message if system_message else default_system_message},
                    {"role": "user", "content": prompt}
                ],
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 500)
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise AIServiceError(f"OpenAI Error: {str(e)}")