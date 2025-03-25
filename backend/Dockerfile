FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias del sistema primero
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar solo requirements.txt primero para cachear este paso
COPY requirements.txt .

# Instalar dependencias con timeout aumentado
RUN pip install --no-cache-dir --default-timeout=100 -r requirements.txt

# Copiar el resto del código
COPY . .

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]