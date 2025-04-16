""" 

from fastapi import APIRouter, Request, BackgroundTasks, Form
from services.twilio_service import send_whatsapp_message
from services.openai_service import get_openai_response
from models import User, Message
from tortoise.transactions import in_transaction

router = APIRouter()


@router.post("/")
async def receive_whatsapp_message(
    request: Request,
    From: str = Form(...),
    Body: str = Form(...)
):
    # Buscar o crear usuario
    user, _ = await User.get_or_create(phone_number=From)

    # Guardar mensaje entrante
    await Message.create(user=user, content=Body, direction="inbound")

    # Preparar respuesta (simple para ahora)
    reply = "Hola, hemos recibido tu mensaje: " + Body

    # Guardar mensaje saliente
    await Message.create(user=user, content=reply, direction="outbound")

    # Enviar respuesta vía Twilio (simulada por ahora)
    await twilio_service.send_message(to=From, body=reply)

    # Retornar algo a Twilio
    return "OK"





@router.post("/webhook")
async def webhook(request: Request, background_tasks: BackgroundTasks):
    form = await request.form()
    from_number = form.get("From")
    body = form.get("Body")

    if not from_number or not body:
        return {"status": "error", "message": "Datos incompletos"}

    phone_number = from_number.replace("whatsapp:", "")

    async with in_transaction():
        # Obtener o crear usuario
        user, _ = await User.get_or_create(phone_number=phone_number)

        # Guardar mensaje entrante
        await Message.create(
            user=user,
            content=body,
            direction="inbound"
        )

    # Generar respuesta desde OpenAI
    response_text = await get_openai_response(body)

    async with in_transaction():
        # Guardar mensaje de respuesta
        await Message.create(
            user=user,
            content=response_text,
            direction="outbound"
        )

    # Enviar respuesta a WhatsApp
    background_tasks.add_task(send_whatsapp_message, to=phone_number, body=response_text)

    return {"status": "ok"} """


from fastapi import APIRouter, Request, BackgroundTasks, HTTPException
from services.twilio_service import TwilioService
from services.ai.factory import AIServiceFactory
from models import User, Message
from tortoise.transactions import in_transaction
import logging
import os
import re

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class WhatsAppWebhookHandler:
    def __init__(self):
        self._ai_provider = None
        self.twilio_service = None
        
        try:
            self.twilio_service = TwilioService()
            logger.info("Twilio service initialized successfully")
        except Exception as e:
            logger.error(f"Twilio service initialization failed: {str(e)}")

        try:
            self._initialize_ai_provider()
        except Exception as e:
            logger.error(f"AI provider initialization failed: {str(e)}")

    def _initialize_ai_provider(self):
        """Inicializa el proveedor de IA configurado"""
        provider_name = os.getenv("AI_PROVIDER", "deepseek")
        model = os.getenv("AI_MODEL")
        
        self._ai_provider = AIServiceFactory.create_provider(provider_name, model)
        logger.info(f"Initialized {provider_name} AI provider with model {model}")

    async def _get_or_create_user(self, phone_number: str) -> User:
        """Obtiene o crea un usuario en la base de datos"""
        try:
            user, created = await User.get_or_create(
                phone_number=phone_number,
                defaults={'name': None}
            )
            if created:
                logger.info(f"Created new user: {phone_number}")
            return user
        except Exception as e:
            logger.error(f"Error creating/getting user: {str(e)}")
            raise HTTPException(status_code=500, detail="Error processing user")

    async def _save_message(self, user: User, content: str, direction: str, role: str) -> Message:
        """Guarda un mensaje en la base de datos"""
        try:
            message = await Message.create(
                user=user,
                content=content,
                direction=direction,
                role=role
            )
            return message
        except Exception as e:
            logger.error(f"Error saving message: {str(e)}")
            raise HTTPException(status_code=500, detail="Error saving message")

    async def process_webhook(self, request: Request, background_tasks: BackgroundTasks):
        """Procesa el webhook completo"""
        try:
            form_data = await request.form()
            raw_phone = form_data.get("From", "")
            body = form_data.get("Body", "").strip()

            # Validación básica
            if not body:
                raise HTTPException(status_code=400, detail="Message body cannot be empty")

            # Normalización del número
            phone_number = self._normalize_phone_number(raw_phone)
            if not phone_number:
                raise HTTPException(status_code=400, detail="Invalid phone number format")

            # Procesamiento de usuario y mensaje
            async with in_transaction():
                user = await self._get_or_create_user(phone_number)
                await self._save_message(user, body, "inbound", "user")

            # Generación de respuesta
            response = await self._generate_ai_response(body)
            #response =" validando envio de chat"
            # Guardado y envío de respuesta
            async with in_transaction():
                await self._save_message(user, response, "outbound", "assistant")

            if self.twilio_service:
                background_tasks.add_task(
                    self._send_whatsapp_reply,
                    phone_number=phone_number,
                    message=response
                )

            return {"status": "success", "message": "Message processed"}

        except HTTPException as he:
            raise
        except Exception as e:
            logger.exception(f"Unexpected error: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error")

    def _normalize_phone_number(self, phone_number: str) -> str:
        """Normaliza números al formato +519xxxxxxxx"""
        try:
            # Extrae solo dígitos
            digits = re.sub(r'[^\d]', '', phone_number)
            
            # Validación básica
            if len(digits) < 9:
                raise ValueError("Número demasiado corto")
            
            # Si es un número peruano sin código (9xxxxxxxx)
            if len(digits) == 9 and digits.startswith('9'):
                return f"+51{digits}"
                
            # Si tiene código de país pero sin + (51xxxxxxxxx)
            if len(digits) == 11 and digits.startswith('51'):
                return f"+{digits}"
                
            # Si ya tiene formato internacional
            if phone_number.startswith('+'):
                return phone_number
                
            raise ValueError(f"Formato no soportado: {phone_number}")
            
        except Exception as e:
            logger.error(f"Error normalizando número: {str(e)}")
            return None

    async def _generate_ai_response(self, prompt: str) -> str:
        """Genera respuesta usando el proveedor de IA"""
        try:
            if not self._ai_provider:
                raise ValueError("AI provider not initialized")
                
            return await self._ai_provider.get_response(prompt)
        except Exception as e:
            logger.error(f"AI response failed: {str(e)}")
            return "Disculpa, estoy teniendo dificultades técnicas. Por favor intenta nuevamente más tarde."

    async def _send_whatsapp_reply(self, phone_number: str, message: str):
        """Envía respuesta por WhatsApp"""
        if not self.twilio_service:
            logger.error("Twilio service not available - message not sent")
            return

        try:
            await self.twilio_service.send_whatsapp(
                to=phone_number,
                body=message
            )
        except Exception as e:
            logger.error(f"Failed to send WhatsApp message: {str(e)}")

# Inicialización del handler
webhook_handler = WhatsAppWebhookHandler()

@router.post("/webhook")
async def webhook_endpoint(request: Request, background_tasks: BackgroundTasks):
    """Endpoint para webhooks de WhatsApp"""
    return await webhook_handler.process_webhook(request, background_tasks)