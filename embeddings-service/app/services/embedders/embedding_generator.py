import os
from sentence_transformers import SentenceTransformer
from typing import List
import logging
import torch

logger = logging.getLogger(__name__)

def get_device():
    """Auto-detects available hardware"""
    if torch.backends.mps.is_available():  # Apple Silicon
        return "mps"
    elif torch.cuda.is_available():  # NVIDIA GPU
        return "cuda"
    return "cpu"

def load_model():
    model_name = os.getenv("EMBEDDING_MODEL", "BAAI/bge-large-en")
    device = get_device()
    # Correct initialization parameters
    model = SentenceTransformer(
        model_name_or_path=model_name,
        device=device
    )
    
    # Set normalization in encode() calls instead
    model.encode_kwargs = {
        'normalize_embeddings': True,
        'batch_size': 32 if device == "cuda" else 8
    }
    
    logger.info(f"EMBEDDING_MODEL:  {model_name} ")
    logger.info(f"EMBEDDING_DIM: {model.get_sentence_embedding_dimension()}")
    return model

model = load_model()

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    if not texts:
        return []
    
    try:
        embeddings = model.encode(
            texts,
            convert_to_tensor=False,
            **model.encode_kwargs
        )
        return embeddings.tolist()
    except Exception as e:
        logger.error(f"Embedding generation failed: {str(e)}")
        raise