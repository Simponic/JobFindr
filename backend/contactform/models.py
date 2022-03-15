from django.db import models

class Role(models.TextChoices):
    RESOLVED = 'resolved'
    OPEN = 'open'

# Create your models here.
class Submission(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=500, null=False)
    status = models.CharField(
            max_lenght=20,
            choices=Role.choices,
            default=Role.OPEN)
