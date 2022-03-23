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
