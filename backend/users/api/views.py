# users/api/views.py
from rest_framework import viewsets, status, generics, permissions,views
from django.conf import settings
from django.core.mail import get_connection
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny  # Añade esta línea
from django.utils.timezone import now
from users.utils import send_password_reset_email
import json
import secrets
import string

from django.contrib.auth import get_user_model
from users.models import Rol, Permiso, UsuarioRol, RolPermiso, ContactForm, WhatsAppRequest
from users.api.serializers import (
    UserSerializer, 
    UserCreateSerializer,
    UserUpdateSerializer,
    CustomTokenObtainPairSerializer,
    RolSerializer,
    PermisoSerializer,
    UsuarioRolSerializer,
    RolPermisoSerializer,
    UserWithRolesSerializer,
    RolWithPermissionsSerializer,
    ContactFormSerializer,
    PasswordResetSerializer
)


User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    

class PasswordResetView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def patch(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            
            # Generar nueva contraseña
            alphabet = string.ascii_letters + string.digits
            new_password = ''.join(secrets.choice(alphabet) for i in range(12))
            user.set_password(new_password)
            user.save()
            
            # Enviar email con diseño corporativo
            send_password_reset_email(user, new_password)
            
            return Response(
                {"message": "Se ha enviado una nueva contraseña al correo electrónico proporcionado."},
                status=status.HTTP_200_OK
            )
            
        except User.DoesNotExist:
            return Response(
                {"error": "No existe un usuario con este email."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            print(f"Error al enviar correo: {str(e)}")  # Log en consola
            return Response(
                {"error": "Ocurrió un error inesperado"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [permissions.IsAuthenticated]

class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer
    permission_classes = [permissions.IsAuthenticated]

class UsuarioRolViewSet(viewsets.ModelViewSet):
    queryset = UsuarioRol.objects.all()
    serializer_class = UsuarioRolSerializer
    permission_classes = [permissions.IsAuthenticated]

class RolPermisoViewSet(viewsets.ModelViewSet):
    queryset = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer
    permission_classes = [permissions.IsAuthenticated]

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserWithRolesSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class UserRolesView(generics.ListAPIView):
    serializer_class = RolSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Rol.objects.filter(usuariorol__usuario=user)

class RolPermissionsView(generics.ListAPIView):
    serializer_class = PermisoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        rol_id = self.kwargs['rol_id']
        return Permiso.objects.filter(rolpermiso__rol_id=rol_id)
    

class ContactFormView(views.APIView):
    permission_classes = [AllowAny]  # Permite acceso sin autenticación
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
    


@method_decorator(csrf_exempt, name='dispatch')
class WhatsAppLogView(views.APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        data = request.data
        phone_number = data.get("phone_number")
        message = data.get("message")

        if phone_number and message:
            WhatsAppRequest.objects.create(
                phone_number=phone_number, 
                message=message
            )
            return Response(
                {"status": "success", "message": "WhatsApp request logged"},
                status=201
            )
        return Response(
            {"status": "error", "message": "Invalid data"},
            status=400
        )
    



    
"""      @csrf_exempt
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

        return JsonResponse({"status": "error", "message": "Invalid request"}, status=405)  """