from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *

router = DefaultRouter()
router.register('register',RegisterViewSet,basename='register'),
router.register('login',LoginViewset,basename='login'),
router.register('user',UserViewSet,basename='user'),
urlpatterns = router.urls
