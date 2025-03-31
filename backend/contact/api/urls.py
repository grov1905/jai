from django.urls import path
from .views import ContactFormView
from .views import log_whatsapp_request

urlpatterns = [
    path('contactform/', ContactFormView.as_view(), name='contact-form'),
    path('whatsapp/log/', log_whatsapp_request, name='log_whatsapp_request'),
]
