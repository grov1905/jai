"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""
from dotenv import load_dotenv
import os 
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

#load_dotenv()  # Carga las variables del archivo .env
# Solo cargar .env si no está en un entorno Docker
if not os.getenv('DOCKER_ENV'):
    load_dotenv(BASE_DIR / ".env")  

BASE_DIR / ".env"

# Luego puedes usarlas así:
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG') == '1'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-#!o0%$8j&7u+ku1(l#xnj4&0ui^=*3)qsqsqf-l^rgav!*w%ur"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "jai-production.up.railway.app",  # Agrega el dominio de Railway aquí
    "https://www.jaiexperts.com",
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'authentication',
    'users',
    'contact',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ¡Debe estar primero!
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# Configuración de autenticación
AUTH_USER_MODEL = 'users.User'  # Usando el modelo en apps/users

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# Configuración CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://jaiproject.vercel.app",
    "https://www.jaiexperts.com",
]

print("NAME:", os.getenv("PGDATABASE"))  # Agrega esta línea temporalmente
print("USER:", os.getenv("PGUSER"))  # Agrega esta línea temporalmente
print("HOST:", os.getenv("PGHOST"))  # Agrega esta línea temporalmente

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases
# Configuración de base de datos
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('PGDATABASE'),
        'USER': os.getenv('PGUSER'), #postgres
        'PASSWORD': os.getenv('PGPASSWORD'), # ${{Postgres.PGPASSWORD}}
        'HOST': os.getenv('PGHOST'), #postgres.railway.internal
        'PORT': '5432',  #5432
    }
}

#postgresql://postgres:suKmDPncirMqwRfXkgDVHWnuOYjCCamZ@postgres.railway.internal:5432/railway


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'es-pe'
TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"
# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# settings.py
# REST_AUTH = {
#    'USER_DETAILS_SERIALIZER': 'users.serializers.UserSerializer'
#} 

print("EMAIL_HOST_USER:", os.getenv("EMAIL_HOST_USER"))  # Agrega esta línea temporalmente

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.privateemail.com'  # Servidor SMTP de PrivateEmail
EMAIL_PORT = 587  # Puerto recomendado para conexión segura con TLS
EMAIL_USE_TLS = True  # Habilita TLS para seguridad
EMAIL_USE_SSL = False  # No uses SSL, usa TLS en su lugar
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')  # Cargar desde .env
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')  # Cargar desde .env
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER  # Usar tu correo como remitente


