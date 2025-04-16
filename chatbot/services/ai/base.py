from abc import ABC, abstractmethod
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class AIProvider(ABC):
    def __init__(self, model: Optional[str] = None):
        self.model = model
    
    @abstractmethod
    async def get_response(self, prompt: str, **kwargs) -> str:
        pass

class AIServiceError(Exception):
    """Excepción base para errores de servicios de IA"""
    pass