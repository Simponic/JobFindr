from django.http import JsonResponse
from django.conf import settings
from authentication.models import User, Role, Worker, WorkerAvailability
from authentication.serializers import serialize_user, serialize_worker
from datetime import datetime
import json
import jwt
from authentication.views import get_user_or_error 

def update_worker_availabilities(request, id):
  user_error_tup = get_user_or_error(request)
  body = json.loads(request.body.decode('utf-8'))
  print(body)
  if (user_error_tup['success']):
    user = user_error_tup['user']
  else:
    return JsonResponse({'success': False, 'message': 'Error fetching user'})

  if (user.worker.id == id or user.role == Role.OWNER):
    availabilities = [
      WorkerAvailability(
        day=entry['day'],
        start_hour=entry['start_hour'],
        start_minute=entry['start_minute'],
        end_hour=entry['end_hour'],
        end_minute=entry['end_minute'],
        worker=user.worker
      )
      for entry in body
    ]
    user.worker.update_availability(availabilities)
    return JsonResponse({'success': True})

  return JsonResponse({'success': False, 'message': 'Error updating worker availabilities'})