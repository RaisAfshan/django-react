from django.db import models

from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

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