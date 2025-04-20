import httpx
from fastapi import HTTPException
from dotenv import load_dotenv
import os
import logging

load_dotenv()

logger = logging.getLogger(__name__)

class EmbeddingsService:
    def __init__(self):
        self.base_url = os.getenv("EMBEDDINGS_SERVICE_URL")
        self.timeout = httpx.Timeout(30.0)
        self.client = httpx.AsyncClient(timeout=self.timeout)

    async def search(self, query: str, top_k: int = None) -> list:
        """Busca fragmentos similares usando el servicio de embeddings"""
        try:
            top_k = top_k or int(os.getenv("EMBEDDINGS_TOP_K", 3))
            url = f"{self.base_url}/api/embeddings/search"

            logger.info(f"RUTA WEB : {url}")
            logger.info(f"TOP_K : {top_k}")

            response = await self.client.post(
                url,
                json={"query": query, "top_k": top_k}
            )
            response.raise_for_status()
           # logger.info(f"response busqueda semantica: {response.json()}")

            return response.json()
        except httpx.HTTPStatusError as e:
            logger.error(f"Error en el servicio de embeddings: {e.response.text}")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Embeddings service error: {e.response.text}"
            )
        except Exception as e:
            logger.error(f"Error inesperado en embeddings service: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail="Error al conectar con el servicio de embeddings"
            )

    async def filter_by_threshold(self, results: list, threshold: float = None) -> list:
        """Filtra resultados por umbral de similitud"""
        threshold = threshold or float(os.getenv("EMBEDDINGS_SIMILARITY_THRESHOLD", 0.8))
        return [item for item in results if item.get("similarity", 0) >= threshold]