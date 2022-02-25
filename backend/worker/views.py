from django.http import JsonResponse
from authentication.models import Role, WorkerAvailability
from authentication.serializers import serialize_worker
import json
from authentication.views import get_user_or_error 

def worker_availabilities(request, id):
  user_error_tup = get_user_or_error(request)
  if (user_error_tup['success']):
    user = user_error_tup['user']
  else:
    return JsonResponse(user_error_tup)

  if (request.method == "GET"):
    return JsonResponse({
      'success': True,
      'availability': serialize_worker(user.worker)['availability']
    })
  elif (request.method == "POST"):
    body = json.loads(request.body.decode('utf-8'))

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

    return JsonResponse({'success': False, 'message': 'Error fetching worker availabilities'})