from .models import Snippet, User
from rest_framework import serializers

class SnippetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Snippet
    exclude = ['updated_at', 'created_at']
  
  
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'password']
    
  def create(self, validated_data):
    username = validated_data['username']
    password = validated_data['password']
    user = User.objects.create_user(username=username)
    user.set_password(password)
    user.save()
    return user