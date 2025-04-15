# users/api/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import Rol, Permiso, UsuarioRol, RolPermiso, ContactForm

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['name'] = user.get_full_name()
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'avatar_url', 'biografia', 'estado', 'is_staff', 'is_superuser',
                 'last_login', 'date_joined', 'phone', 'company']
        read_only_fields = ['last_login', 'date_joined', 'is_staff', 'is_superuser']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'phone', 'company']
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'avatar_url', 'biografia', 'phone', 'company']

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    
    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("No existe un usuario con este email.")
        return value

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class PermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = '__all__'

class UsuarioRolSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='usuario',
        write_only=True
    )
    rol = RolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all(), 
        source='rol',
        write_only=True
    )
    
    class Meta:
        model = UsuarioRol
        fields = '__all__'

class RolPermisoSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all(), 
        source='rol',
        write_only=True
    )
    permiso = PermisoSerializer(read_only=True)
    permiso_id = serializers.PrimaryKeyRelatedField(
        queryset=Permiso.objects.all(), 
        source='permiso',
        write_only=True
    )
    
    class Meta:
        model = RolPermiso
        fields = '__all__'

class UserWithRolesSerializer(UserSerializer):
    roles = RolSerializer(many=True, read_only=True)
    
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['roles']

class RolWithPermissionsSerializer(RolSerializer):
    permisos = PermisoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Rol
        fields = ['id', 'nombre', 'descripcion', 'nivel_prioridad', 'permisos']  # Lista explícita

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ['name', 'email', 'message']        