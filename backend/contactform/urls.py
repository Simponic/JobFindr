
from django.urls import path

from . import views

urlpatterns = [
    path('new', views.create_new_submission, name='create-new-submission'),
]