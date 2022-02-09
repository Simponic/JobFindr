from django.shortcuts import render
from django.http import JsonResponse
from authentication.models import User
import json

def index(request):
  return JsonResponse({"user": "testing"})

def sign_up(request):
  print(json.loads(request.body.decode('utf-8')))
  return JsonResponse({"user": "testing"})
