from django.urls import path

from . import views

urlpatterns = [
    path('login', views.log_in, name='user-login'),
    path('sign-up', views.sign_up, name='user-signup'),
    path('<int:id>', views.profile, name='user-profile'),
    path('all-users', views.get_users_or_error, name='get-users'),
]