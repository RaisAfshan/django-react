from django.db import models

# Create your models here.
class Notes(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    
