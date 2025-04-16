import os
import aiohttp
from .base import AIProvider, AIServiceError
from dotenv import load_dotenv

load_dotenv()

class DeepSeekService(AIProvider):
    def __init__(self, model: str = "deepseek-chat"):
        super().__init__(model)
        self.api_key = os.getenv("DEEPSEEK_API_KEY")
        self.base_url = os.getenv("DEEPSEEK_API_URL", "https://api.deepseek.com/v1")
    
    async def get_response(self, prompt: str, **kwargs) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": "Eres un asistente útil."},
                {"role": "user", "content": prompt}
            ],
            "temperature": kwargs.get("temperature", 0.7),
            "max_tokens": kwargs.get("max_tokens", 500)
        }
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30
                ) as response:
                    if response.status != 200:
                        error = await response.text()
                        raise AIServiceError(f"DeepSeek API Error: {error}")
                    
                    data = await response.json()
                    return data['choices'][0]['message']['content'].strip()
        except Exception as e:
            raise AIServiceError(f"DeepSeek Connection Error: {str(e)}")