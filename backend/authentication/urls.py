from django.urls import path

from . import views

urlpatterns = [
    path('login', views.log_in, name='user-login'),
    path('sign-up', views.sign_up, name='user-signup'),
    path('me', views.me, name='user-detail'),
]