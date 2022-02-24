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
  jsonBody = json.loads(request.body.decode('utf-8'))
  body = jsonBody['body']
  print(body)
  if (user_error_tup['success']):
    user = user_error_tup['user']
  else:
    return JsonResponse({'success': False, 'message': 'Error fetching user'})

  if (user.worker.id == id or user.role == Role.OWNER):

    availabilities = [
      WorkerAvailability(
      day=body['sunday']['day'], 
      start_hour=body['sunday']['start_hour'],
      start_minute=body['sunday']['start_minute'],
      end_hour=body['sunday']['end_hour'],
      end_minute=body['sunday']['end_minute'],
      worker_id=body['sunday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['monday']['day'], 
      start_hour=body['monday']['start_hour'],
      start_minute=body['monday']['start_minute'],
      end_hour=body['monday']['end_hour'],
      end_minute=body['monday']['end_minute'],
      worker_id=body['monday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['tuesday']['day'], 
      start_hour=body['tuesday']['start_hour'],
      start_minute=body['tuesday']['start_minute'],
      end_hour=body['tuesday']['end_hour'],
      end_minute=body['tuesday']['end_minute'],
      worker_id=body['tuesday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['wednesday']['day'], 
      start_hour=body['wednesday']['start_hour'],
      start_minute=body['wednesday']['start_minute'],
      end_hour=body['wednesday']['end_hour'],
      end_minute=body['wednesday']['end_minute'],
      worker_id=body['wednesday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['thursday']['day'], 
      start_hour=body['thursday']['start_hour'],
      start_minute=body['thursday']['start_minute'],
      end_hour=body['thursday']['end_hour'],
      end_minute=body['thursday']['end_minute'],
      worker_id=body['thursday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['friday']['day'], 
      start_hour=body['friday']['start_hour'],
      start_minute=body['friday']['start_minute'],
      end_hour=body['friday']['end_hour'],
      end_minute=body['friday']['end_minute'],
      worker_id=body['friday']['worker_id'],
      ),
      WorkerAvailability(
      day=body['saturday']['day'], 
      start_hour=body['saturday']['start_hour'],
      start_minute=body['saturday']['start_minute'],
      end_hour=body['saturday']['end_hour'],
      end_minute=body['saturday']['end_minute'],
      worker_id=body['saturday']['worker_id'],
      ),
    ]
    worker = user.worker
    worker.update_availability(availabilities)
    return JsonResponse({'success': True})

  return JsonResponse({'success': False, 'message': 'Error updating worker availabilities'})