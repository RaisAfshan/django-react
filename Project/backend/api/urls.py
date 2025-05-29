from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register('postBlog',views.PostView, basename='postBlog')
router.register('user', views.UserView, basename='user')
urlpatterns = [
    path("",include(router.urls)),
    path('signUp/',views.RegisterView.as_view(),name='signUp'),
    path('api/token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('myposts/',views.MyPost.as_view(),name='mypost')
   
]