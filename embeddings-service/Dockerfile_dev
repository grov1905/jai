FROM python:3.10-slim

# Crear directorio de trabajo
WORKDIR /app

# Instala dependencias systema (necesarias para torch y pgvector)
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements y luego instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --upgrade sentence-transformers torch numpy
# Copiar el resto del código
COPY . .

# Dar permisos al script de entrada
#RUN chmod +x /app/entrypoint.sh

# Establecer el script como entrypoint
#ENTRYPOINT ["/app/entrypoint.sh"]

# Variables de entorno para optimizar torch en Apple Silicon
ENV PYTORCH_ENABLE_MPS_FALLBACK=1
ENV PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]