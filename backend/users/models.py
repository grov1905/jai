""" from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Campos adicionales para registro
    telefono = models.CharField(max_length=20, blank=True)
    empresa = models.CharField(max_length=100, blank=True)
    
    class Meta:
        db_table = 'auth_user'  # Mantener compatibilidad """


from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return self.email