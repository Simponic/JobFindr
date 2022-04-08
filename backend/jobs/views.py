from django.http import JsonResponse
from authentication.serializers import serialize_public_user_fields
from jobs.models import JobType, Job, Status, WorkerJobTimes
from authentication.models import Role, User, Worker, WorkerAvailability
from jobs.serializers import serialize_jobtype, serialize_job, serialize_job_time
from django.conf import settings
import json
import decimal
from authentication.views import get_user_or_error

def job_types(request):
    return JsonResponse({'success': True, 'job_types': list(map(lambda x: serialize_jobtype(x), JobType.objects.filter(archived=False)))})

def __set_fields(user, body, method="POST", job=None):
    try:
        updated_time = False
        if (method == "POST"):
            job = Job()
            job.user = user
        job.price = float(body['price'])
        job.job_type = JobType.objects.get(id=body['jobType'])
        job.time_estimate = float(body['timeEstimate'])
        job.start_time = body['startTime']
        job.end_time = body['endTime']
        job.address = body['address']
        job.latitude = body['coords']['lat']
        job.longitude = body['coords']['lng']
        job.comment = body['comment']
        if (user.role == Role.OWNER):
            job.status = body['status']
        if (method == "PUT"):
            job.status = Status.AVAILABLE
        job.save()
        if (job.status == Status.AVAILABLE):
            return job.try_assign_worker()
        elif (method == "PUT"):
            return {'success': True, 'job': serialize_job(job)}
        return job.try_assign_worker()
    except:
        return {'success': False, 'message': 'Failed to create or update job'}

def job_detail(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    try:
        job = Job.objects.get(id=id)
    except Job.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Job does not exist'})
    
    try:
        job_time = WorkerJobTimes.objects.get(job=job)
    except WorkerJobTimes.DoesNotExist:
        job_time = None
    
    if user.role == Role.WORKER:
        if not job_time or not job_time.worker.user.id == user.id:
            return JsonResponse({'success': False, 'message': 'You are not assigned to this job'})
    elif not (user.id == job.user.id or user.role == Role.OWNER):
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this job'})

    resp = {'success': True, 'job': serialize_job(job)}
    if job_time:
        resp['worker'] = serialize_public_user_fields(job_time.worker.user)
        resp['job_time'] = serialize_job_time(job_time)
    resp['customer'] = serialize_public_user_fields(job.user)
    return JsonResponse(resp)

def job_update(request, id):
    body = json.loads(request.body.decode('utf-8'))
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    try:
        job = Job.objects.get(id=id)
        if not (user.id == job.user.id or user.role == Role.OWNER):
            return JsonResponse({'success': False, 'message': 'You do not have permission to update this job'})
    except Job.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Job does not exist'})
    
    return JsonResponse(__set_fields(user, body, method="PUT", job=job))

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
        job_type=body['name'],
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
            serialize_job(job_time.job)
            for job_time in job_times
        ], 'job_times': [serialize_job_time(job_time) for job_time in job_times]})
    elif (user.role == Role.CUSTOMER):
        return JsonResponse({'success': True, 'jobs': [serialize_job(j) for j in Job.objects.filter(user=user).all()]})
    elif (user.role == Role.OWNER):
        return JsonResponse({'success': True, 'jobs': [serialize_job(j) for j in Job.objects.all()]})

def complete_job(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    try:
        job = Job.objects.get(id=id)
        if not job.status == Status.ASSIGNED:
            return JsonResponse({'success': False, 'message': 'Job not assigned'})
        if not user.role == Role.OWNER and not user.id == job.user.id:
            return JsonResponse({'success': False, 'message': 'You can\'t mark that job as complete'})
    except Job.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Job does not exist'})
    
    try:
        workertimeentry = WorkerJobTimes.objects.get(job=job)
        worker = workertimeentry.worker
    except WorkerJobTimes.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'No worker found assigned to job'})
    
    try:
        owner = User.objects.get(role=Role.OWNER)
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'No owner found. Job cannot be marked completed'})

    # MONEY
    job.user.balance -= decimal.Decimal(job.price)
    worker.user.balance += decimal.Decimal(settings.WORKER_PERCENTAGE * job.price)
    owner.balance += decimal.Decimal((1 - settings.WORKER_PERCENTAGE) * job.price)

    job.status = Status.COMPLETE
    job.save()
    job.user.save()
    worker.user.save()
    owner.save()

    return JsonResponse({'success': True, 'withdrawn': job.price})

def assign(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    try: 
        job = Job.objects.get(id=id)
        if not job.status == Status.AVAILABLE:
            return JsonResponse({'success': False, 'message': 'Job not available'})
        if not user.id == job.user.id and not user.role == Role.OWNER:
            return JsonResponse({'success': False, 'message': 'You can\'t assign that job'})
    except Job.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Job does not exist'})
    
    return JsonResponse(job.try_assign_worker())

def all_jobs(request):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    if not (user.role == Role.OWNER):
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this page'})
    else:
        try:
            return JsonResponse({'success': True, 'jobs': list(map(lambda x: serialize_job(x), Job.objects.filter().order_by('-id')))})
        except:
            return JsonResponse({'success': False, 'message': 'Error retrieving jobs'})

def all_job_types(request):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    if not (user.role == Role.OWNER):
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this page'})
    else:
        try:
            return JsonResponse({'success': True, 'job_types': list(map(lambda x: serialize_jobtype(x), JobType.objects.all()))})
        except:
            return JsonResponse({'success': False, 'message': 'Error retrieving job types'})

def toggle_archived(request, id):
    user_error_tup = get_user_or_error(request)

    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)
    
    try: 
        jobtype = JobType.objects.get(id=id)
        if not user.role == Role.OWNER:
            return JsonResponse({'success': False, 'message': 'You don\'t have permission to access this'})
    except JobType.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Job type does not exist'})
    
    return JsonResponse(jobtype.try_toggle_archived())
