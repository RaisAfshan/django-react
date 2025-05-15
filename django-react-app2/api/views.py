from django.shortcuts import render
from api.models import Notes
from api.serializer import NotesSerializer
from rest_framework import viewsets

# Create your views here.
class NotesView(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    queryset = Notes.objects.all()
