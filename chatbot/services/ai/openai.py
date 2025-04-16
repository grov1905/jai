
import openai
from .base import AIProvider, AIServiceError
from dotenv import load_dotenv
import os

load_dotenv()

class OpenAIService(AIProvider):
    def __init__(self, model: str = "gpt-3.5-turbo"):
        super().__init__(model)
        self.client = openai.AsyncClient(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def get_response(self, prompt: str, **kwargs) -> str:
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "Eres un asistente útil."},
                    {"role": "user", "content": prompt}
                ],
                temperature=kwargs.get("temperature", 0.7),
                max_tokens=kwargs.get("max_tokens", 500)
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise AIServiceError(f"OpenAI Error: {str(e)}")