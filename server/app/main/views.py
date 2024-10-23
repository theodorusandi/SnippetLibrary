
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token

from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from main.models import Snippet
from main.serializers import SnippetSerializer, UserSerializer

@api_view(["GET"])
def get_csrf(request):
  return JsonResponse({'token': get_token(request)})

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get(request, language):
  query = request.GET.get('query', '')
  snippets = Snippet.objects.filter(language=language, user=request.user).order_by('-updated_at')
  if query:
    snippets = snippets.filter(description__icontains=query)
  serializer = SnippetSerializer(snippets, many=True)
  return JsonResponse({'snippets': serializer.data}, safe=False)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add(request):
  try:
    data = JSONParser().parse(request)
    serializer = SnippetSerializer(data=data)
    if serializer.is_valid():
      serializer.save(user=request.user)
      return JsonResponse({'id': serializer.data["id"]}, status=201)
    return HttpResponse(status=400)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=400)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request):
  try:
    data = JSONParser().parse(request)
    snippet = Snippet.objects.get(id=data['id'], user=request.user)
    snippet.delete()
    return HttpResponse(status=204)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=400)
  
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_languages(request):
  languages = list(Snippet.objects.filter(user=request.user).values_list('language', flat=True).distinct().order_by('language'))
  return JsonResponse({'languages': languages})

@api_view(["POST"])
def signup(request):
  try:
    data = JSONParser().parse(request)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse({'user': serializer.data["username"]},status=201)
    return HttpResponse(status=400)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=400)