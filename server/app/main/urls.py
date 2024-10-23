from django.urls import path
from . import views
from rest_framework.authtoken import views as rest_framework_views
from .CustomAuthToken import CustomAuthToken

urlpatterns = [
  path("csrf/get", views.get_csrf, name="get_csrf"),
  path("auth/signup", views.signup, name="signup"),
  path("auth/signin", CustomAuthToken.as_view(), name="signin"),
  path("snippets/<str:language>/get", views.get, name="get"),
  path("snippets/add", views.add, name="add"),
  path("snippets/delete", views.delete, name="delete"),
  path("languages/get", views.get_languages, name="get_languages")
]