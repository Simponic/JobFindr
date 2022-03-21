from django.http import JsonResponse
from contactform.models import Submission, Status
from jobs.models import Job
from authentication.models import Role, User
from authentication.views import get_user_or_error
import json

def create_new_submission(request):
    body = json.loads(request.body.decode('utf-8'))
    user_error_tup = get_user_or_error(request)
    
    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    submission = Submission(
        user=user,
        body=body['body'],
        email=body['email'],
        status=Status.OPEN,
    )

    if ('job_id' in body):
        try:
            job = Job.objects.get(pk=body['job_id'])
            submission.job = job
        except Job.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Job does not exist'})

    submission.save()
    return JsonResponse({'success': True})
