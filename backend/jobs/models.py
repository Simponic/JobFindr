from django.db import models
from django.conf import settings

class Status(models.TextChoices):
    AVAILABLE = 'available'
    ASSIGNED = 'assigned'
    COMPLETE = 'complete'
    DISPUTED = 'disputed'


class JobType(models.Model):
    job_type = models.CharField(max_length=50, null=False)
    icon = models.CharField(null=False)
    available = models.BooleanField(null=False, default=True)

    def create_new_job_type(self, jobType, icon):
        self.jobType = jobType
        self.available = True
        self.icon = icon


class Job(models.Model):
    user_id = models.IntegerField(null=False)
    type_id = models.IntegerField(null=False)
    price = models.FloatField()
    time_estimate = models.FloatField()
    start_time = models.BigIntegerField(default=0, null=False)
    end_time = models.BigIntegerField(default=0, null=False)
    address = models.CharField()
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    comment = models.CharField(max_length=150)
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.AVAILABLE)

    job_type = models.OneToOneField(JobType, on_delete=models.CASCADE,)

