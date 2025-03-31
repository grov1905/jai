from django.db import models
from django.utils.timezone import now

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