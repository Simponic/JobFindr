from django.http import JsonResponse
from jobs.models import JobType, Job
from authentication.models import Role, User
import json
from authentication.views import get_user_or_error



def create_job(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    body = json.loads(request.body.decode('utf-8'))

    job = Job(
        user_id=user_error_tup['user'].id,
        job_type=body['job_type'],
        price=body['price'],
        time_estimate=body['time_estimate'],
        start_time=body['start_time'],
        end_time=body['end_time'],
        address=user.home_address,
        latitude=user.home_latitude,
        longitude=user.home_longitude,
        comment=body['comment'],
    )

    job.save()


def create_new_job_type(request, id):
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