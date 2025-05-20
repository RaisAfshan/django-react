from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('email is a required field') # Prevents issues with case sensitivity
        email = self.normalize_email(email) # This creates a new User object (based on your custom User model) using the provided email and any extra fields.
        user = self.model(email=email,**extra_fields) # This hashes the password properly before saving it.
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=200,unique=True)
    birthday = models.DateField(null=True,blank=True)
    username = models.CharField(max_length=200,null=True,blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = []

@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args,**kwargs):
    print("Password reset token created signal triggered")
    sitelink = "http://localhost:5173/"
    token = "{}".format(reset_password_token.key)
    user = reset_password_token.user
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    full_link = str(sitelink) + "password-reset/" + str(uid) + "/" + str(token) + "/"

    print(token)
    print(full_link)

    context={
       'full_link':full_link,
       'email_address':reset_password_token.user.email 
    }

    html_message = render_to_string("backend/email.html",context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject = "Request for resetting password for {title} ".format(title=reset_password_token.user.email),
        body = plain_message,
        from_email = "example@gmail.com", # settings.DEFAULT_FROM_EMAIL
        to = [reset_password_token.user.email]
    )
    msg.attach_alternative(html_message,"text/html")
    msg.send()