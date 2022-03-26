from django.http import JsonResponse
from jobs.models import JobType, Job, Status, WorkerJobTimes
from authentication.models import Role, User, Worker, WorkerAvailability
from jobs.serializers import serialize_jobtype, serialize_job
import json
from authentication.views import get_user_or_error

def job_types(request):
    return JsonResponse({'success': True, 'job_types': list(map(lambda x: serialize_jobtype(x), JobType.objects.filter(archived=False)))})

def __set_fields(user, body, method="POST", job=None):
    if (method == "POST"):
        job = Job()
    job.user = user
    job.price = body['price']
    job.job_type = JobType.objects.get(id=body['jobType'])
    job.time_estimate = float(body['timeEstimate'])
    job.start_time = body['startTime']
    job.end_time = body['endTime']
    job.address = body['address']
    job.latitude = body['coords']['lat']
    job.longitude = body['coords']['lng']
    job.comment = body['comment']
    job.save()
    return job.try_assign_worker()

def create_job(request):
    body = json.loads(request.body.decode('utf-8'))
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    if (not user.role == Role.CUSTOMER):
        return JsonResponse({'success': False, 'message': 'You do not have permission to create jobs'})

    return JsonResponse(__set_fields(user, body)) 

def create_new_job_type(request):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    if not(user.role == Role.OWNER):
        return JsonResponse({'success': False, 'message': 'You do not have permission to create new job types'})

    body = json.loads(request.body.decode('utf-8'))

    jobType = JobType(
        name=body['name'],
        icon=body['icon'],
    )

    jobType.save()

    return JsonResponse({'success': True})

def user_jobs(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    if not (user.role == Role.OWNER or user.id == id):
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this user\'s jobs'})
    if (user.role == Role.WORKER):
        user_worker = Worker.objects.get(user=user)
        job_times = WorkerJobTimes.objects.filter(worker=user_worker)
        return JsonResponse({'success': True, 'jobs': [
            {
                'id': job_time.job.id,
                'title': job_time.job.get_title(),
                'job_type': serialize_jobtype(job_time.job.job_type),
                'price': job_time.job.price,
                'coords': {
                    'lat': job_time.job.latitude,
                    'lng': job_time.job.longitude,
                },
                'start_time': job_time.job.start_time,
                'end_time': job_time.job.end_time,
            }
            for job_time in job_times
        ]})
    elif (user.role == Role.CUSTOMER):
        return JsonResponse({'success': True, 'jobs': [serialize_job(j) for j in Job.objects.filter(user=user).all()]})
    elif (user.role == Role.OWNER):
        return JsonResponse({'success': True, 'jobs': [serialize_job(j) for j in Job.objects.all()]})