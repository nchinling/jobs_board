from django.urls import path

from . import views

urlpatterns = [
    path("create_resume", views.create_resume,
         name='create_resume'),
]
