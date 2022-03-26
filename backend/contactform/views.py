from django.http import JsonResponse
from contactform.models import Submission, Status
from jobs.models import Job
from authentication.models import Role, User
from authentication.views import get_user_or_error
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

    if ('job_id' in body and body['job_id']):
        try:
            job = Job.objects.get(pk=body['job_id'])
            submission.job = job
        except Job.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Job does not exist'})

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
        return JsonResponse({'success': False, 'message': 'You do not have permission to view this user'})
