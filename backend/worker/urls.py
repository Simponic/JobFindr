from django.urls import path

from . import views

urlpatterns = [
  path('<int:id>/availabilities', views.worker_availabilities, name='worker-availabilities'),
  path('load-availability', views.worker_availabilities, name='load-availability'),
]