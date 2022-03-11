from django.http import JsonResponse
from authentication.models import Role, Worker, WorkerAvailability
from authentication.serializers import serialize_worker
import json
from authentication.views import get_user_or_error 

def worker_availabilities(request, id):
  user_error_tup = get_user_or_error(request)
  if (user_error_tup['success']):
    user = user_error_tup['user']
  else:
    return JsonResponse(user_error_tup)

  if (not (user.worker.id == id or user.role == Role.OWNER)):
    return JsonResponse({'success': False, 'message': "You do not have permission to view this worker's availabilities"})
  try:
    worker = Worker.objects.get(pk=id)
  except Worker.DoesNotExist:
    return JsonResponse({'success': False, 'message': "Worker does not exist"})

  if (request.method == "GET"):
    try:
      return JsonResponse({
        'success': True,
        'availability': serialize_worker(worker)['availability']
      })
    except:
      return JsonResponse({'success': False, 'message': 'Error fetching worker availabilities'})

  elif (request.method == "POST"):
    try:
      body = json.loads(request.body.decode('utf-8'))
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
      worker.update_availability(availabilities)
      return JsonResponse({'success': True})
    except:
      return JsonResponse({'success': False, 'message': 'Error posting new worker availabilities'})