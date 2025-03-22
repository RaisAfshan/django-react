# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import Todo

# create a serializer class
class TodoSerializer(serializers.ModelSerializer):
    # images = serializers.FileField()  # or required=True, if image is mandatory


    # create a meta class
    class Meta:
        model = Todo
        fields = ('id', 'title','description','images')