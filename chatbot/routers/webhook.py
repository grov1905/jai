from fastapi import APIRouter, Request, BackgroundTasks, HTTPException
from services.twilio_service import TwilioService
from services.embeddings_service import EmbeddingsService
from services.ai.factory import AIServiceFactory
from models import User, Message
from tortoise.transactions import in_transaction
import logging
import os
import re
from typing import Optional
from langdetect import detect

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class WhatsAppWebhookHandler:
    def __init__(self):
        self._ai_provider = None
        self.twilio_service = None
        self.embeddings_service = None
        self._initialize_services()

    def _initialize_services(self):
        """Inicializa todos los servicios necesarios"""
        try:
            self.twilio_service = TwilioService()
            self.embeddings_service = EmbeddingsService()
            self._initialize_ai_provider()
            logger.info("Todos los servicios inicializados correctamente")
        except Exception as e:
            logger.error(f"Error inicializando servicios: {str(e)}")
            raise

    def _initialize_ai_provider(self):
        """Inicializa el proveedor de IA configurado"""
        provider_name = os.getenv("AI_PROVIDER", "deepseek")
        model = os.getenv("AI_MODEL")
        self._ai_provider = AIServiceFactory.create_provider(provider_name, model)
        logger.info(f"Proveedor AI inicializado: {provider_name} ({model})")

    async def _get_or_create_user(self, phone_number: str) -> User:
        """Obtiene o crea un usuario con historial de conversación"""
        try:
            user, created = await User.get_or_create(
                phone_number=phone_number,
                defaults={'name': None, 'language': 'es'}
            )
            if created:
                logger.info(f"Nuevo usuario creado: {phone_number}")
            return user
        except Exception as e:
            logger.error(f"Error en _get_or_create_user: {str(e)}")
            raise HTTPException(status_code=500, detail="Error procesando usuario")

    async def _save_message(self, user: User, content: str, direction: str, role: str) -> Message:
        """Guarda mensaje con metadatos de contexto"""
        try:
            message = await Message.create(
                user=user,
                content=content,
                direction=direction,
                role=role,
                language=await self._detect_language(content)
            )
            return message
        except Exception as e:
            logger.error(f"Error guardando mensaje: {str(e)}")
            raise

    async def _detect_language(self, text: str) -> str:
        """Detecta el idioma del texto"""
        try:
            return detect(text)
        except:
            return 'es'  # Default español

    async def _get_conversation_context(self, user: User, limit: int = 3) -> str:
        """Obtiene el contexto histórico de la conversación"""
        
        try:
            last_messages = await Message.filter(
                user=user
            ).order_by('-timestamp').limit(limit)
            return "\n".join([m.content for m in last_messages])
        except Exception as e:
            logger.error(f"Error obteniendo contexto: {str(e)}")
            return ""

    async def process_webhook(self, request: Request, background_tasks: BackgroundTasks):
        """Flujo principal del webhook mejorado"""
        try:
            # 1. Extraer datos básicos
            form_data = await request.form()
            raw_phone = form_data.get("From", "")
            body = form_data.get("Body", "").strip()

            if not body:
                raise HTTPException(status_code=400, detail="Mensaje vacío")

            # 2. Normalizar y validar
            phone_number = self._normalize_phone_number(raw_phone)
            if not phone_number:
                raise HTTPException(status_code=400, detail="Número inválido")

            # 3. Manejo de usuario y registro
            async with in_transaction():
                user = await self._get_or_create_user(phone_number)
                await self._save_message(user, body, "inbound", "user")

            # 4. Generar respuesta inteligente
            response = await self._generate_optimal_response(body, user)

            # 5. Guardar y enviar respuesta
            async with in_transaction():
                await self._save_message(user, response, "outbound", "assistant")

            background_tasks.add_task(
                self._send_whatsapp_reply,
                phone_number=phone_number,
                message=response
            )

            return {"status": "success", "processed": True}

        except HTTPException as he:
            raise
        except Exception as e:
            logger.exception(f"Error crítico: {str(e)}")
            return {"status": "error", "message": "Error procesando solicitud"}

    async def _generate_optimal_response(self, prompt: str, user: User) -> str:
        """Estrategia combinada de respuesta"""
       
    
        # lang = getattr(user, 'language', 'es')  # Usa 'es' como default si no existe
        
        try:
            # 1. Primero intentar con embeddings semánticos
            embedding_response = await self._generate_with_embeddings(prompt, user)
            #logger.info(f"Respuesta de embeddings semántico: {embedding_response}")

            # 2. Verificar si requiere escalar a humano
            if await self._requires_human_assistance(embedding_response, prompt):
                logger.info("2. Verificar si requiere escalar a humano")
                return await self._get_human_escalation_message('es')  #user.language
                
            # 3. Si embeddings no funcionó, usar IA directamente
            return embedding_response if embedding_response else await self._generate_ai_response(prompt, user)
            
        except Exception as e:
            logger.error(f"Error generando respuesta: {str(e)}")
            return await self._get_fallback_message('es')   #user.language
        
    async def _generate_with_embeddings(self, prompt: str, user: User) -> Optional[str]:
        """Flujo de búsqueda semántica mejorado con respuesta natural cuando no hay resultados"""
        try:
            # 1. Obtener fragmentos relevantes
            results = await self.embeddings_service.search(prompt)
            logger.info("1. Obtener fragmentos relevantes")

            # 2. Filtrar por umbral
            filtered = await self.embeddings_service.filter_by_threshold(results)
            logger.info("2. Filtrar por umbrals")

            # 3. Construir contexto básico con historial
           # history = await self._get_conversation_context(user)
           # logger.info(f"historial: {history} ")
            if not filtered:
                logger.info("No se encontraron fragmentos relevantes")
                
                system_message = (
                f"Eres un asistente servicial." #  Historial reciente:\n{history}\n
                "Responde de manera natural indicando que no encontraste información específica sobre la consulta, "
                "pero ofrécete amablemente a ayudar con otros temas. Usa un tono empático y profesional. "
                "Ejemplo: 'No encontré información exacta sobre [tema], pero con gusto puedo ayudarte con...'"
                )
            
                return await self._ai_provider.get_response(
                    prompt,
                    system_message=system_message,
                    temperature=0.6,  # Un poco más creativo para respuestas amables
                    max_tokens=200
                )
            
            # 4. Si hay resultados relevantes    
            context = "\n".join([f"- {item['chunk']}" for item in filtered])
            #logger.info(f"CONTEXTO: {context} ")
            logger.info("4. Si hay resultados relevantes")
            system_message = (
                f"Eres un asistente empatico" #  Historial reciente:\n{history}\n
                "Características: "
                "- Servicial, paciente y con conocimiento "
                "- Explica los chunks proporcionados, la moneda es en soles"
                "- Si preguntan por algo fuera del constexto, responde: 'que no hay de manera empatica'"
                "Responde con amabilidad y usa solo los datos del contexto, minimo una palabra y maximo en 200 palabras. y termina siempre preguntando como te puedo ayudar o que apoyo neecesistas de mi"
                "contexto"
                f"\n{context}\n"
            )
           # logger.info(f"MENSAJE IDA: {system_message} ")
            response = await self._ai_provider.get_response(
                prompt,
                system_message=system_message,
                temperature=0.5,  # Más preciso para respuestas basadas en datos
                max_tokens=300
            )
        
            # 5. Asegurar ofrecimiento de ayuda adicional
            #if not any(palabra in response.lower() for palabra in ["puedo ayudarte", "gusto", "necesitas algo"]):
            #    response += "\n\n¿Necesitas ayuda con algo más relacionado a este tema?"
            
            return response
        
        except Exception as e:
            logger.error(f"Error en flujo embeddings: {str(e)}")
            # Fallback natural si hay error técnico
            return (
                "Disculpa, estoy teniendo dificultades para buscar la información. "
                "¿Podrías reformular tu pregunta o necesitas ayuda con otro tema?"
            )

    async def _requires_human_assistance(self, response: str, original_prompt: str) -> bool:
        """Determina si se necesita escalar a humano"""
        negative_triggers = ["no sé", "no tengo", "no puedo", "disculpa"]
        if not response:
            return True
            
        response_lower = response.lower()
        return (
            any(trigger in response_lower for trigger in negative_triggers) or
            "asesor humano" in original_prompt.lower()
        )

    async def _generate_ai_response(self, prompt: str, user: User) -> str:
        """Genera respuesta directa desde IA"""
        try:
           # history = await self._get_conversation_context(user)
            system_message = (
            #    f"Eres un asistente útil. Historial reciente:\n{history}\n"
                "Eres un asistente útil."
            #    f"Idioma preferido: {'es'}\n"
                "sugiere contactar a un asesor."
            )
            logger.info("Genera respuesta directa desde IA")
            return await self._ai_provider.get_response(
                prompt,
                system_message=system_message
            )
        except Exception as e:
            logger.error(f"Error en IA: {str(e)}")
            return await self._get_fallback_message('es')  #user.language

    async def _get_human_escalation_message(self, language: str = 'es') -> str:
        """Mensaje para transferir a agente humano"""
        messages = {
            'es': "Hola, voy a transferirte con un especialista. ¿Podrías darme tu correo electrónico por favor?",
            'en': "A human agent will contact you shortly. Could you confirm your email address?"
        }
        return messages.get(language, messages['es'])

    async def _get_fallback_message(self, language: str = 'es') -> str:
        """Mensaje de respaldo genérico"""
        messages = {
            'es': "Hola, en este momento no me encuentro disponible, me puedes escribir mas tarde por favor",
            'en': "I'm experiencing technical issues. Please try again later."
        }
        return messages.get(language, messages['es'])

    def _normalize_phone_number(self, phone_number: str) -> Optional[str]:
        """Normaliza números al formato internacional"""
        try:
            digits = re.sub(r'[^\d]', '', phone_number)
            
            if len(digits) == 9 and digits.startswith('9'):  # Perú
                return f"+51{digits}"
            elif len(digits) == 11 and digits.startswith('51'):  # Perú con código
                return f"+{digits}"
            elif phone_number.startswith('+'):
                return phone_number
                
            raise ValueError(f"Formato no soportado: {phone_number}")
            
        except Exception as e:
            logger.error(f"Error normalizando número: {str(e)}")
            return None

    async def _send_whatsapp_reply(self, phone_number: str, message: str):
        """Envía respuesta con manejo de errores"""
        if not self.twilio_service:
            logger.error("Twilio no configurado - mensaje no enviado")
            return

        try:
            await self.twilio_service.send_whatsapp(
                to=phone_number,
                body=message[:1600]  # Limitar tamaño para evitar errores
            )
            logger.info(f"Mensaje enviado a {phone_number}")
        except Exception as e:
            logger.error(f"Error enviando WhatsApp: {str(e)}")

# Inicialización del handler
webhook_handler = WhatsAppWebhookHandler()

@router.post("/webhook")
async def webhook_endpoint(request: Request, background_tasks: BackgroundTasks):
    """Endpoint principal para webhooks de WhatsApp"""
    return await webhook_handler.process_webhook(request, background_tasks)

@router.get("/health")
async def health_check():
    """Endpoint de verificación de salud"""
    return {
        "status": "OK",
        "services": {
            "twilio": bool(webhook_handler.twilio_service),
            "embeddings": bool(webhook_handler.embeddings_service),
            "ai_provider": bool(webhook_handler._ai_provider)
        }
    }