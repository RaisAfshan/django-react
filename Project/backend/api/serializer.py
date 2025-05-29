from api.models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True,validators = [validate_password])
    password2 = serializers.CharField(write_only=True,required=True)

    class Meta:
        model = User
        fields = ['username','password','password2','first_name','last_name','country','phone_number','id']

    def validate(self,attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password":"password field didn't match"})
        return attrs
    def create(self,validate_data):
        validate_data.pop('password2')
        user = User.objects.create_user(**validate_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    author = RegisterSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id','title','image','caption','created_at','author')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ['username','first_name','last_name','country','phone_number','id']
