from django.http import JsonResponse
from django.conf import settings
from authentication.models import User, Role, Worker
from authentication.serializers import serialize_user, serialize_worker
from datetime import datetime
import json
import jwt

def get_user_or_error(request):
  try:
    auth_header = request.headers.get('Authorization')
    token = jwt.decode(auth_header.split('Bearer ')[1], settings.JWT_SECRET, algorithms=['HS256'])
    if (token['exp'] < int(datetime.now().strftime('%s'))):
      return {'success': False, 'message': 'Token expired'}
    try:
      user = User.objects.get(pk=token['id'])
      return {'success': True, 'user': user}
    except User.DoesNotExist:
      return {'success': False, 'message': 'User does not exist'}
  except:
    return {'success': False, 'message': 'Error authenticating user'}

def me(request):
  me = get_user_or_error(request)
  if (me['success']):
    resp = {'success': True, 'user': serialize_user(me['user'])}
    if (me['user'].role == Role.WORKER):
      resp['worker'] = serialize_worker(me['user'].worker)
    return JsonResponse(resp)
  return JsonResponse(me)

def log_in(request):
  body = json.loads(request.body.decode('utf-8'))
  try:
    user = User.objects.get(email=body['email'])
  except User.DoesNotExist:
    return JsonResponse({'success': False, 'message': 'Email does not exist'})

  if (user.compare_password(body['password'])):
    return JsonResponse({'success': True, 'jwt_token': user.get_jwt_token()})
  return JsonResponse({'success': False, 'message': 'Error signing in. Double-check email and password'})

def sign_up(request):
  body = json.loads(request.body.decode('utf-8'))

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

  return JsonResponse({'success': True})



