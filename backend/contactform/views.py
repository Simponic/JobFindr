from django.http import JsonResponse
from contactform.models import Submission
from authentication.models import Role, User
from authentication.views import get_user_or_error
import json

# Create your views here.

def create_new_submission(request, id):
    user_error_tup = get_user_or_error(request)
    
    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    form_body = json.loads(request.body.decode('utf-8'))

    submission = Submission(
        user_id=user_error_tup['user'].id,
        job = form_body['job'],
        body = form_body['body'],
            )

    submission.save()
