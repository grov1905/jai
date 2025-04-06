from django.db import models

# Create your models here.
# users/models.py
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import uuid

class User(AbstractUser):
    # Campos personalizados
    avatar_url = models.URLField(max_length=255, blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    estado = models.CharField(max_length=20, default='activo', 
                            choices=[('activo', 'Activo'), 
                                    ('inactivo', 'Inactivo'), 
                                    ('suspendido', 'Suspendido')])
    phone = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    
    # Agrega estos campos para resolver el conflicto
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="custom_user_set",  # Nombre único
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="custom_user_set",  # Nombre único
        related_query_name="user",
    )
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return self.email

class Rol(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    nivel_prioridad = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = _('Rol')
        verbose_name_plural = _('Roles')
        ordering = ['-nivel_prioridad', 'nombre']
    
    def __str__(self):
        return self.nombre

class Permiso(models.Model):
    codigo = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = _('Permiso')
        verbose_name_plural = _('Permisos')
        ordering = ['codigo']
    
    def __str__(self):
        return f"{self.codigo} - {self.nombre}"

class UsuarioRol(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = _('Asignación de Rol')
        verbose_name_plural = _('Asignaciones de Roles')
        unique_together = ('usuario', 'rol')
    
    def __str__(self):
        return f"{self.usuario.email} - {self.rol.nombre}"

class RolPermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = _('Permiso de Rol')
        verbose_name_plural = _('Permisos de Roles')
        unique_together = ('rol', 'permiso')
    
    def __str__(self):
        return f"{self.rol.nombre} - {self.permiso.codigo}"
    
class ContactForm(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
    
class WhatsAppRequest(models.Model):
    phone_number = models.CharField(max_length=15)
    message = models.TextField()
    timestamp = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.phone_number} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"