from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('notes',views.NotesView,basename='notes1')

urlpatterns = [
    path("",include(router.urls)),
]