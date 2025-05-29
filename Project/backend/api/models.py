from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=200)
    last_name =  models.CharField(max_length=200)
    country  = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.FileField(upload_to='posts/', blank=True, null=True)
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='postUser')

class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.FileField(upload_to='avatars/', blank=True, null=True)
