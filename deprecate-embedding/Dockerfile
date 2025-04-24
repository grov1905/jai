# Usar imagen base de Python 3.10
FROM python:3.10-slim


# Crear directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias para torch y pgvector
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements.txt primero para aprovechar el cache de Docker
COPY requirements.txt .

# Instalar las dependencias desde requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto de la aplicación (por defecto, FastAPI usa el puerto 8000)
EXPOSE 8000

# Comando para ejecutar la aplicación con uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
