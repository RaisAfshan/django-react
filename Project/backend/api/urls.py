from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('postBlog',views.PostView, basename='postBlog')
urlpatterns = [
    path("",include(router.urls)),
]