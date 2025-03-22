from django.db import models

class Todo(models.Model):
    title=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    images =models.FileField(upload_to='uploads/')

    # string representation of the class
    def __str__(self):

        #it will return the title
        return self.title 
