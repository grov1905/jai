    # chatbot/models.py

from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    phone_number = fields.CharField(max_length=20, unique=True)
    name = fields.CharField(max_length=100, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)

    messages: fields.ReverseRelation["Message"]
    class Meta:
        table = "chat_user"  # Prefijo "app_" + nombre de la tabla
    def __str__(self):
        return self.phone_number

class Message(Model):
    id = fields.IntField(pk=True)
    user: fields.ForeignKeyRelation[User] = fields.ForeignKeyField(
        "models.User", related_name="messages"
    )
    content = fields.TextField()
    role = fields.CharField(max_length=10)  # 'user' o 'assistant'
    direction = fields.CharField(max_length=10)  # 'inbound' o 'outbound'
    timestamp = fields.DatetimeField(auto_now_add=True)
    class Meta:
        table = "chat_message"  # Prefijo "app_" + nombre de la tabla
    def __str__(self):
        return f"{self.role}: {self.content[:30]}"