from django.http import JsonResponse
from django.conf import settings
from authentication.models import User, Role, Worker
from authentication.serializers import serialize_user, serialize_worker
from datetime import datetime
import json
import jwt
from authentication.views import get_user_or_error 

def update_worker_availabilities(request, id):
  user_error_tup = get_user_or_error(request)

  if (user_error_tup['success']):
    user = user_error_tup['user']
  else:
    return JsonResponse({'success': False, 'message': 'Error fetching user'})

  if (user.worker.id == id or user.role == Role.OWNER):
    # Use worker.update_availability
    return JsonResponse({'success': True})

  return JsonResponse({'success': False, 'message': 'Error updating worker availabilities'})