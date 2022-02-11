from django.shortcuts import render
from django.http import JsonResponse
from authentication.models import User, Role, Worker, WorkerAvailability
import json

def sign_up(request):
  body = json.loads(request.body.decode('utf-8'))

  # Validation
  if (User.objects.filter(email=body['email']).exists()):
    return JsonResponse({'success': False, 'message': 'Email already exists'})
  if (User.objects.filter(phone_number=body['phone_number']).exists()):
    return JsonResponse({'success': False, 'message': 'Phone number already exists'})

  user = User(
    name=body['name'], 
    email=body['email'], 
    phone_number=body['phone_number'],
    role=Role.WORKER if body['role'] == 'worker' else Role.CUSTOMER
  )
  user.set_password(body['password'])
  user.save()

  if (body['role'] == 'worker'):
    worker = Worker(
      user=user,
    )
    worker.save()

  return JsonResponse({'success': True, 'jwt_token': user.get_jwt_token()})



