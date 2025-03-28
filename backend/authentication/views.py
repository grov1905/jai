
from django.contrib.auth import get_user_model  # Importación crítica
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()  # Ahora sí reconocerá la función

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(email=email)  # Busca por email
            if user.check_password(password):     # Verifica contraseña manualmente
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': {
                       'id': user.id,
                       'email': user.email,
                       'name': user.username
                        }
                    })
        except User.DoesNotExist:
            pass
        
        return Response(
            {'error': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )