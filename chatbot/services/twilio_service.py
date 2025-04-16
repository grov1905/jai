import os
import re
from twilio.rest import Client
from twilio.http.async_http_client import AsyncTwilioHttpClient  # Nuevo import
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

class TwilioService:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            try:
                # Carga explícita del archivo .env
                env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
                load_dotenv(env_path)
                
                cls._instance._initialize()
            except Exception as e:
                logger.critical(f"Failed to initialize Twilio: {str(e)}")
                cls._instance = None
                raise
        return cls._instance
    
    def _initialize(self):
        """Carga y valida credenciales"""
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.whatsapp_from = os.getenv("TWILIO_WHATSAPP_FROM")
        
        # Validación completa
        missing = []
        if not self.account_sid: missing.append("TWILIO_ACCOUNT_SID")
        if not self.auth_token: missing.append("TWILIO_AUTH_TOKEN")
        if not self.whatsapp_from: missing.append("TWILIO_WHATSAPP_FROM")
        
        if missing:
            error_msg = f"Missing Twilio credentials: {', '.join(missing)}"
            logger.error(error_msg)
            raise ValueError(error_msg)
            
        # Configura cliente HTTP asíncrono
        self.http_client = AsyncTwilioHttpClient()  # Nueva línea
        self.client = Client(
            self.account_sid,
            self.auth_token,
            http_client=self.http_client  # Nueva configuración
        )
        logger.info("Twilio service initialized successfully with async client")

    async def send_whatsapp(self, to: str, body: str) -> str:
        """Envía mensaje WhatsApp con validación robusta"""
        try:
            normalized_to = self._normalize_phone(to)
            if not normalized_to:
                raise ValueError(f"Invalid phone number format: {to}")
                
            response = await self.client.messages.create_async(
                from_=self.whatsapp_from,
                to=f"whatsapp:{normalized_to}",
                body=body
            )
            logger.info(f"Message sent to {normalized_to} (SID: {response.sid})")
            return response.sid
        except Exception as e:
            logger.error(f"Failed to send WhatsApp message: {str(e)}")
            raise

    def _normalize_phone(self, phone: str) -> str:
        """Normaliza números peruanos a formato internacional (+51...)"""
        try:
            # Elimina todo excepto dígitos
            digits = re.sub(r'[^\d]', '', phone)
            
            # Validación básica
            if len(digits) < 9:
                raise ValueError("Phone number too short")
                
            # Añade código de país si es necesario
            if digits.startswith('9') and len(digits) == 9:  # Número peruano
                return f"+51{digits}"
            elif digits.startswith('51') and len(digits) == 11:  # Código país incluido
                return f"+{digits}"
            else:
                raise ValueError("Unsupported phone number format")
        except Exception as e:
            logger.error(f"Phone number normalization failed: {str(e)}")
            return None