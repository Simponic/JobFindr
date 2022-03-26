from django.http import JsonResponse
from django.conf import settings
from authentication.models import User, Role, Worker
from authentication.serializers import serialize_user, serialize_worker
import json
import jwt

def get_user_or_error(request):
  try:
    auth_header = request.headers.get('Authorization')
    try:
      token = jwt.decode(auth_header.split('Bearer ')[1], settings.JWT_SECRET, algorithms=['HS256'])
    except jwt.exceptions.ExpiredSignatureError:
      return {'success': False, 'message': 'Session expired. Please re-login.'}
    try:
      user = User.objects.get(pk=token['id'])
      return {'success': True, 'user': user}
    except User.DoesNotExist:
      return {'success': False, 'message': 'User does not exist'}
  except:
    return {'success': False, 'message': 'Error authenticating user'}

def get_users_or_error(request):
  user_error_tup = get_user_or_error(request)
  if (user_error_tup['success']):
    if (user_error_tup['user'].role == Role.OWNER):
      try:
        return JsonResponse({'success': True, 'users': list(map(lambda x: serialize_user(x), User.objects.all()))})
      except:
        return {'success': False, 'message': 'Failed to get users'}
    else:
      return JsonResponse({'success': False, 'message': 'You do not have permission to view this page'})
  

def __set_fields(body, method="POST", user=None):
  if (method == "POST"):
    user = User()
    user.role = Role.WORKER if body['role'] == 'worker' else Role.CUSTOMER
  
  body['phone_number'] = User.strip_phone_number(body['phone_number'])
  emailAlreadyExists = User.objects.filter(email=body['email']).exists()
  if (method == "PUT"):
    emailAlreadyExists = emailAlreadyExists and user.email != body['email']
  if (emailAlreadyExists):
    return {'success': False, 'message': 'Email already exists'}
  
  phoneAlreadyExists = User.objects.filter(phone_number=body['phone_number']).exists()
  if (method == "PUT"):
    phoneAlreadyExists = phoneAlreadyExists and user.phone_number != body['phone_number']
  if (phoneAlreadyExists):
    return {'success': False, 'message': 'Phone number already exists'}

  try:
    user.email = body['email']
    user.phone_number = body['phone_number']
    user.balance = body['balance']
    user.avatar = body['avatar']
    user.name = body['name']
    if ('address' in body):
      user.home_address = body['address']
    if ('coords' in body and 'lat' in body['coords'] and 'lng' in body['coords']):
      user.home_latitude = body['coords']['lat']
      user.home_longitude = body['coords']['lng']
    if (body['password']):
      user.set_password(body['password'])
    elif (method == "POST"):
      return {'success': False, 'message': 'Password is required'}
    user.save()
  except:
    return {'success': False, 'message': 'Failed to update or create user'}
  return {'success': True, 'user': user}

def profile(request, id):
  user_error_tup = get_user_or_error(request)
  if (user_error_tup['success']):
    if (user_error_tup['user'].id == id):
      user = user_error_tup['user']
    elif (user_error_tup['user'].role == Role.OWNER):
      user = User.objects.get(pk=id)
    else:
      return JsonResponse({'success': False, 'message': 'You do not have permission to view this user'})
  else:
    return JsonResponse(user_error_tup)

  if (request.method == "GET"):
    resp = {'success': True, 'user': serialize_user(user)}
    if (user.role == Role.WORKER):
      resp['worker'] = serialize_worker(user.worker)
    return JsonResponse(resp)

  elif (request.method == "PUT"):
    try:
      body = json.loads(request.body.decode('utf-8'))
      response = __set_fields(body, method="PUT", user=user)

      if (response['success']):
        return JsonResponse({'success': True, 'new_token': user.get_jwt_token()})
      return JsonResponse(response)
    except:
      return {'success': False, 'message': 'Failed to update user'}

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
  user_error_tup = get_user_or_error(request)
  if (user_error_tup['success']):
    return JsonResponse({'success': False, 'message': 'You are already signed in'})

  body = json.loads(request.body.decode('utf-8'))
  try:
    create_user_error_tup = __set_fields(body, method="POST")
    if (create_user_error_tup['success']):
      user = create_user_error_tup['user']
    else:
      return JsonResponse(create_user_error_tup)

    if (body['role'] == 'worker'):
      worker = Worker(
        user=user,
      )
      worker.save()

    return JsonResponse({'success': True})
  except:
    return JsonResponse({'success': False, 'message': 'Failed to create user'})