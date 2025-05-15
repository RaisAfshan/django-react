from api.models import Notes
from rest_framework import serializers

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ('id','title','description')