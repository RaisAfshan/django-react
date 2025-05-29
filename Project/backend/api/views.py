from django.shortcuts import render
from rest_framework import viewsets,status,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import *
from api.serializer import *
from  rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

# Create your views here.



class PostView(viewsets.ModelViewSet):
    permission_classes =[IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self,serializer):
        serializer.save(author=self.request.user)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self,request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserView(viewsets.ViewSet):
    permission_class = [IsAuthenticated]

    @action(detail=False,methods=['get'],url_path='me')
    def me(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class MyPost(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        posts=Post.objects.filter(author=user)
        serializer = PostSerializer(posts,many=True)
        return Response(serializer.data)

