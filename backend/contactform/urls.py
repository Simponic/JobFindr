
from django.urls import path

from . import views

urlpatterns = [
    path('new', views.create_new_submission, name='create-new-submission'),
    path('all-forms', views.get_forms_or_error, name='get-forms'),
]