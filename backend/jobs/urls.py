from django.urls import path

from . import views

urlpatterns = [
    path('<int:id>/create-job', views.create_job, name='create-job'),
    path('<int:id>/create-new-job-type', views.create_new_job_type, name='new-job-type'),
]
