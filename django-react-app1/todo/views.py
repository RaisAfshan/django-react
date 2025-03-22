


# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import TodoSerializer
from rest_framework.parsers import MultiPartParser, FormParser


# import the Todo model from the models file
from .models import Todo

# create a class for the Todo model viewsets
class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

