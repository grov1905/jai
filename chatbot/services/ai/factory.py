#chatbot/services/ai/factory.py
from .openai import OpenAIService
from .deepseek import DeepSeekService
from .base import AIProvider
import logging

logger = logging.getLogger(__name__)

class AIServiceFactory:
    @staticmethod
    def create_provider(provider_name: str, model: str = None) -> AIProvider:
        providers = {
            "openai": OpenAIService,
            "deepseek": DeepSeekService
        }
        
        if provider_name not in providers:
            logger.warning(f"Provider {provider_name} not found. Using deepseek as default")
            provider_name = "deepseek"
        
        try:
            return providers[provider_name](model) if model else providers[provider_name]()
        except Exception as e:
            logger.error(f"Error creating {provider_name} provider: {str(e)}")
            raise