from django.http import JsonResponse
from jobs.models import JobType, Job, Status
from authentication.models import Role, User, Worker, WorkerAvailability
import json
from authentication.views import get_user_or_error

def create_job(request):
    body = json.loads(request.body.decode('utf-8'))
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    job = Job(
        user=user,
        price=body['price'],
        job_type=JobType.get(id=body['job_type']),
        time_estimate=body['time_estimate'],
        start_time=body['start_time'],
        end_time=body['end_time'],
        address=body['address'],
        latitude=body['latitude'],
        longitude=body['longitude'],
        comment=body['comment'],
    )

    for i in Worker:
        Job.assign_job(job, i)
        if job.status == Status.ASSIGNED:
            break
    if job.status != Status.ASSIGNED:
        job.save()
        return {'success': False, 'message': 'No available workers at this time for this job'}

    job.save()
    return {'success': True, 'message': 'A worker is on their way'}

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
