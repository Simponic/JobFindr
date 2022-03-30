from django.http import JsonResponse
from authentication.models import Worker
from jobs.models import WorkerJobTimes
from contactform.models import Submission, Status
from jobs.models import Job
from jobs.models import Status as JobStatus
from authentication.models import Role, User
from authentication.views import get_user_or_error
import datetime
import json

def create_new_submission(request):
    body = json.loads(request.body.decode('utf-8'))
    user_error_tup = get_user_or_error(request)
    
    submission = Submission(
        body=body['body'],
        email=body['email'],
        status=Status.OPEN,
    )

    if ('user' in user_error_tup):
        submission.user = user_error_tup['user']

    try:
        if (submission.user and 'job_id' in body and body['job_id']):
            job = Job.objects.get(pk=body['job_id'])
            jobtime = WorkerJobTimes.objects.get(job=job)
            worker = jobtime.worker
            if submission.user.role == Role.WORKER and not submission.user.id == worker.user.id:
                return JsonResponse({'success': False, 'message': 'You do not have permission to dispute a job for another worker'})
            elif not submission.user.role == Role.WORKER and not (submission.user.id == job.user.id or submission.user.role == Role.OWNER):
                return JsonResponse({'success': False, 'message': 'You do not have permission to dispute a job for another user'})

            if ((submission.user.role == Role.WORKER and job.status == JobStatus.ASSIGNED) or (submission.user.role == Role.OWNER or submission.user.role == Role.CUSTOMER)) and (job.status == JobStatus.ASSIGNED or job.status == JobStatus.COMPLETE):
                if job.status == JobStatus.ASSIGNED and datetime.datetime.now().timestamp() < jobtime.end_time:
                    return JsonResponse({'success': False, 'message': 'You cannot dispute a job whose scheduled end time has not passed'})
                job.status = JobStatus.DISPUTED
                job.save()
                submission.job = job
            elif job.status == JobStatus.DISPUTED: 
                return JsonResponse({'success': False, 'message': 'This job has already been disputed'})
            else:
                return JsonResponse({'success': False, 'message': 'You do not have permission to dispute a job for another user'})
    except:
        return JsonResponse({'success': False, 'message': 'Error adding job to submission; are you the worker or customer assigned to that job?'})

    submission.save()
    return JsonResponse({'success': True})

def get_forms_or_error(request):
    user_error_tup = get_user_or_error(request)
    if (user_error_tup['success']):
        if (user_error_tup['user'].role == Role.OWNER):
            try:
                submissions = Submission.objects.all()
                return JsonResponse({'success': True, 'submissions': [serialize_submission(submission) for submission in submissions]})
            except:
                return JsonResponse({'success': False, 'message': 'Failed to get submissions'})
    else:
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this page'})
