FROM python:3.11-slim

# Crear directorio de la app
WORKDIR /app

# Copiar requirements si existe
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto de la app
COPY . .

# Exponer puerto de FastAPI
EXPOSE 8000

# Comando default (también lo pusimos en docker-compose)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]