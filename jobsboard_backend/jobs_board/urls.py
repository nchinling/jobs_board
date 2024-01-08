from django.urls import path

from . import views

urlpatterns = [
    path("create_resume", views.create_resume,
         name='create_resume'),
    path("get_all_resumes", views.get_all_resumes,
         name='get_all_resumes'),
]
