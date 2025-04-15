# users/utils.py
from django.core.mail import get_connection, EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.timezone import now

def send_password_reset_email(user, new_password):
    subject = "Restablecimiento de Contraseña - JAIExperts"
    
    try:
        # Renderizar plantilla HTML
        context = {
            'user_first_name': user.first_name or 'usuario/a',
            'new_password': new_password,
            'user_email': user.email
        }
        html_content = render_to_string('emails/password_reset.html', context)
        
        # Versión de texto plano
        text_content = f"""... (tu contenido existente, con now() corregido) ..."""
        
        # Crear el email
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.SUPPORT_EMAIL_HOST_USER,  # Usar desde settings
            [user.email],
            reply_to=[settings.SUPPORT_EMAIL_HOST_USER],
            headers={'X-JAIExperts': 'PasswordReset'}
        )
        msg.attach_alternative(html_content, "text/html")
        
        # Intenta enviar con cuenta support primero
        try:
            connection = get_connection(
                username=settings.SUPPORT_EMAIL_HOST_USER,
                password=settings.SUPPORT_EMAIL_HOST_PASSWORD,
                fail_silently=False,
            )
            msg.connection = connection
            msg.send()
            return True
        except Exception as e:
            print(f"Error con cuenta support: {str(e)}")
            # Fallback a cuenta principal
            connection = get_connection(
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                fail_silently=False,
            )
            msg.from_email = settings.EMAIL_HOST_USER  # Actualiza remitente
            msg.connection = connection
            msg.send()
            return True
            
    except Exception as e:
        print(f"Error general en send_email: {str(e)}")
        raise  # Re-lanza el error para manejarlo en la vista




def send_email_with_account(subject, message, recipient_list, from_email=None, account='default'):
    """
    Envía email autenticando con diferentes cuentas según el parámetro 'account'
    
    Args:
        account: 'default' (jai@) o 'support' (support@)
    """
    if account == 'support':
        auth_user = settings.SUPPORT_EMAIL_HOST_USER
        auth_password = settings.SUPPORT_EMAIL_HOST_PASSWORD
    else:
        auth_user = settings.EMAIL_HOST_USER
        auth_password = settings.EMAIL_HOST_PASSWORD
    
    if from_email is None:
        from_email = auth_user
    
    connection = get_connection(
        username=auth_user,
        password=auth_password,
        fail_silently=False,
    )
    
    email = EmailMessage(
        subject,
        message,
        from_email,
        recipient_list,
        connection=connection,
    )
    return email.send()