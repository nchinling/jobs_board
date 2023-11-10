from django.urls import path

from . import views

urlpatterns = [
    path("create-user-account", views.create_user_account,
         name='create_user_account'),
]
