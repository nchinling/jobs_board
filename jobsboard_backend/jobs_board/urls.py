from django.urls import path

from . import views

urlpatterns = [
    path("create_resume", views.create_resume,
         name='create_resume'),
    path("get_all_resumes", views.get_all_resumes,
         name='get_all_resumes'),
    path("create-user-account", views.create_user_account,
         name='create-user-account'),
    path("login-account", views.login,
         name='login-account'),
]
