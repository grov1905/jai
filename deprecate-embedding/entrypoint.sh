#!/bin/sh

echo "Esperando a que la base de datos esté disponible..."

# Esperar a que la base de datos responda en el puerto 5432
while ! nc -z db 5432; do
  echo "Esperando a PostgreSQL..."
  sleep 1
done

echo "PostgreSQL está disponible. Ejecutando migraciones..."

# Ejecutar migraciones de Alembic
alembic upgrade head

echo "Migraciones aplicadas. Levantando la aplicación..."

# Levantar FastAPI con uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
