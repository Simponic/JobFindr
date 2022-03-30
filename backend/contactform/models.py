from django.db import models
from authentication.models import User
from jobs.models import Job

class Status(models.TextChoices):
    RESOLVED = 'resolved'
    OPEN = 'open'
class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, null=True)
    email = models.CharField(max_length=255, null=False)
    body = models.CharField(max_length=500, null=False)
    status = models.CharField(
            max_length=20,
            choices=Status.choices,
            default=Status.OPEN)

    def try_toggle_status(self):
        try:
            if (self.status == Status.OPEN):
                self.status = Status.RESOLVED
                self.save()
                return {'success': True, 'message': 'Contact form status toggled successfully'}
            if (self.status == Status.RESOLVED):
                self.status = Status.OPEN
                self.save()
                return {'success': True, 'message': 'Contact form status toggled successfully'}
        except:
            return {'success': False, 'message': 'An error occured when toggling the form status'}
