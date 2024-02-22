from django.urls import path

from . import views

urlpatterns = [
    path("create_resume", views.create_resume,
         name='create_resume'),
    path("get_all_resumes", views.get_all_resumes,
         name='get_all_resumes'),
    path("get_resume", views.get_resume,
         name='get_resume'),
    path("create-user-account", views.create_user_account,
         name='create-user-account'),
    path("login-account", views.login,
         name='login-account'),
    path("logout-account", views.logout,
         name='logout-account'),
    path("get_all_jobs", views.get_all_jobs,
         name='get_all_jobs'),
    path("create_job", views.create_job,
         name='create_job'),

]
