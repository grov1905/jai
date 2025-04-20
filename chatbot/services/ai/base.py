#chatbot/services/ai/base.py
from abc import ABC, abstractmethod
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class AIProvider(ABC):
    def __init__(self, model: Optional[str] = None):
        self.model = model
    
    @abstractmethod
    async def get_response(self, prompt: str, system_message: Optional[str] = None, **kwargs) -> str:
        pass

class AIServiceError(Exception):
    """Excepción base para errores de servicios de IA"""
    pass

