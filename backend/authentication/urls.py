from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='user'),
    path('sign-up', views.sign_up, name='user'),
]