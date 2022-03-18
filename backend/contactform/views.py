from django.shortcuts import render
from contactform.models import Submission
from authentication. models import Role, User

# Create your views here.

def create_new_submission(request, id):
    user_error_tup = get_user_or_error(request)
    
    if (user_error_tup['success']):
        user = user_error_tup['user']
    else:
        return JsonResponse(user_error_tup)

    body = json.loads(request.body.decode('utf-8'))

    submission = Submission(
        user_id=user_error_tup['user'],


        
            )
