from django.db import models
from authentication.models import User, Worker, WorkerAvailability
from django.conf import settings
import math
import datetime

class Status(models.TextChoices):
    AVAILABLE = 'available'
    ASSIGNED = 'assigned'
    COMPLETE = 'complete'
    DISPUTED = 'disputed'


class JobType(models.Model):
    job_type = models.CharField(max_length=50, null=False)
    icon = models.CharField(max_length=100, null=False)
    archived = models.BooleanField(null=False, default=False)


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    price = models.FloatField()
    time_estimate = models.FloatField()
    start_time = models.BigIntegerField(default=0, null=False)
    end_time = models.BigIntegerField(default=0, null=False)
    address = models.CharField(max_length=150)
    latitude = models.FloatField(null=False)
    longitude = models.FloatField(null=False)
    comment = models.CharField(max_length=150)
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.AVAILABLE)

    job_type = models.OneToOneField(JobType, on_delete=models.SET_NULL, null=True)

    def availabilities_in_time_range(self, availabilities):
        start_time = datetime.datetime.fromtimestamp(self.start_time)
        end_time = datetime.datetime.fromtimestamp(self.end_time)
        days = [(start_time.weekday()+1)%7]

        possible_work_times = []
        index = 0
        while not days[-1] == (end_time.weekday()+1)%7 and not (index > 0 and days[-1] == days[0]):
            availabilities_on_day = list(filter(lambda x: x.day == days[index], availabilities))
            for a in availabilities_on_day:
                s = start_time.replace(hour=a.start_hour, minute=a.start_minute)+datetime.timedelta(days=index)
                e = min(end_time, start_time.replace(hour=a.end_hour, minute=a.end_minute)+datetime.timedelta(days=index))
                possible_work_times.append((s, e))
            days.append((days[index]+1)%7)
            index += 1
        
        work_ranges = WorkerAvailability.union_datetime_ranges_over_days(possible_work_times)

        return list(filter(lambda x: x[1] - x[0] >= datetime.timedelta(hours=self.time_estimate), work_ranges))

    def find_worker(self):
        # creating variables to make code in future less confusing when doing the math
        def distance(worker):
            jobLat = self.latitude / 57.29577951
            jobLong = self.longitude / 57.29577951
            workerLat = worker.user.home_latitude / 57.29577951
            workerLong = worker.user.home_longitude / 57.29577951
            # 57.29577951 is approximately 180/PI, so converts values from degrees to radians

            return abs(3963.0 * math.arccos[(math.sin(jobLat) * math.sin(workerLat)) + math.cos(jobLat) *
                                            math.cos(workerLat) * math.cos(workerLong - jobLong)])
        workers_in_radius = filter(lambda x: distance(x) <= settings.WORKER_RADIUS, Worker.objects.all())

        for worker in workers_in_radius:
            worker_availabilities = self.availabilities_in_time_range(WorkerAvailability.objects.filter(worker=worker))
            
            #worker_job_times = WorkerJobTimes.objects.filter(worker=worker)

    def get_title(self):
        return self.job_type.job_type + " @ " + self.address

class WorkerJobTimes(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    start_time = models.BigIntegerField(default=0, null=False)
    end_time = models.BigIntegerField(default=0, null=False)


class WorkerJobTypes(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    job_type = models.OneToOneField(JobType, on_delete=models.CASCADE)
