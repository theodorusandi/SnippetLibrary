from django.db import models
from django.contrib.auth.models import User

class Snippet(models.Model):
  language = models.CharField(max_length=200)
  code = models.TextField()
  description = models.TextField()
  updated_at = models.DateTimeField(auto_now=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)