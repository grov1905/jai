from rest_framework.response import Response
from rest_framework import status, views
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactFormSerializer
from ..models import ContactForm

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
import json
from contact.models import WhatsAppRequest


class ContactFormView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_mail(
                subject="Nuevo mensaje de contacto",
                message=f"Nombre: {serializer.validated_data['name']}\n"
                        f"Email: {serializer.validated_data['email']}\n"
                        f"Mensaje: {serializer.validated_data['message']}",
                   from_email=settings.DEFAULT_FROM_EMAIL,
 #                   from_email=serializer.validated_data['email'],
                recipient_list=['contacto@jaiexperts.com'],
                fail_silently=False,
            )   
            return Response({"message": "Mensaje enviado con éxito"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@csrf_exempt
def log_whatsapp_request(request):
    if request.method == "POST":
        data = json.loads(request.body)
        phone_number = data.get("phone_number")
        message = data.get("message")

        if phone_number and message:
            WhatsAppRequest.objects.create(phone_number=phone_number, message=message, timestamp=now())
            return JsonResponse({"status": "success", "message": "WhatsApp request logged"}, status=201)
        else:
            return JsonResponse({"status": "error", "message": "Invalid data"}, status=400)

    return JsonResponse({"status": "error", "message": "Invalid request"}, status=405)