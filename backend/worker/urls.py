from django.urls import path

from . import views

urlpatterns = [
  path('<int:id>/availabilities', views.update_worker_availabilities, name='worker-availabilities'),
]