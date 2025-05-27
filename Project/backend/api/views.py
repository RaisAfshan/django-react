from django.shortcuts import render
from rest_framework import viewsets
from api.models import *
from api.serializer import *
# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
