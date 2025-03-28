from rest_framework import generics, permissions, status  # ← Añadir status aquí
from rest_framework.response import Response
from .serializers import UserSerializer

class RegisterAPI(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "message": "Usuario registrado exitosamente"
        }, status=status.HTTP_201_CREATED)  # ← Usar status correctamente