from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=200)
    image = models.FileField(upload_to='posts/', blank=True, null=True)
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    #  author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    avatar = models.FileField(upload_to='avatars/', blank=True, null=True)
