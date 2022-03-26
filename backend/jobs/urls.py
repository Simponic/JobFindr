from django.urls import path

from . import views

urlpatterns = [
    path('create-job', views.create_job, name='create-job'),
    path('<int:id>/create-new-job-type', views.create_new_job_type, name='new-job-type'),
    path('job-types', views.job_types, name='job-types'),
    path('user/<int:id>', views.user_jobs, name='user-jobs'),
]
