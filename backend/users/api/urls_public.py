from django.urls import path
from rest_framework.permissions import AllowAny
from .views import (
    ContactFormView,
    WhatsAppLogView  # Necesitarás convertir la función en una clase-based view
)

urlpatterns = [
    path('contactform/', ContactFormView.as_view(permission_classes=[AllowAny])), 
    path('whatsapp/log/', WhatsAppLogView.as_view(permission_classes=[AllowAny])),
]