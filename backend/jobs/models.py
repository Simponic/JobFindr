from django.db import models
from authentication.models import User, Worker, WorkerAvailability
from jobs.serializers import serialize_job
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

    def try_toggle_archived(self):
        try:
            self.archived = not self.archived
            self.save()
            return {'success': True, 'message': 'Job type status toggled successfully'}
        except:
            return {'success': False, 'message': 'An error occured when toggling the job type status'}


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

    job_type = models.ForeignKey(JobType, on_delete=models.CASCADE, null=False)

    def availabilities_job_completeable_in(self, availabilities):
        start_time = datetime.datetime.fromtimestamp(self.start_time).replace(second=0)
        end_time = datetime.datetime.fromtimestamp(self.end_time).replace(second=0)
        days = [(start_time.weekday()+1)%7]

        possible_work_times = []
        index = 0
        while not days[-1] == (end_time.weekday()+1)%7 and not (index > 0 and days[-1] == days[0]):
            days.append((days[index]+1)%7)
            index += 1
        for i in range(len(days)):
            availabilities_on_day = list(filter(lambda x: x.day == days[i], availabilities))
            for a in availabilities_on_day:
                s = max(max(start_time.replace(hour=a.start_hour, minute=a.start_minute)+datetime.timedelta(days=i), datetime.datetime.now()), start_time)
                e = min(end_time, start_time.replace(hour=a.end_hour, minute=a.end_minute)+datetime.timedelta(days=i))
                possible_work_times.append((s, e))
        work_ranges = WorkerAvailability.union_datetime_ranges_over_days(possible_work_times)

        return list(filter(lambda x: x[1] - x[0] >= datetime.timedelta(hours=self.time_estimate), work_ranges))

    def try_assign_worker(self):
        WorkerJobTimes.objects.filter(job=self).delete()
        if (datetime.datetime.now().timestamp() + self.time_estimate * 3600 > self.end_time):
            return {'success': False, 'message': 'Impossible to complete job after its end time'}
        if (not self.status == Status.AVAILABLE):
            return {'success': False, 'message': 'Job not available'}
        def distance(worker):
            jobLat = self.latitude / 57.29577951
            jobLong = self.longitude / 57.29577951
            workerLat = worker.user.home_latitude / 57.29577951
            workerLong = worker.user.home_longitude / 57.29577951
            # 57.29577951 is approximately 180/PI, so converts values from degrees to radians

            return abs(3963.0 * math.acos((math.sin(jobLat) * math.sin(workerLat)) + math.cos(jobLat) *
                                            math.cos(workerLat) * math.cos(workerLong - jobLong)))
        workers_in_radius = list(filter(lambda x: distance(x) <= settings.WORKER_RADIUS, Worker.objects.filter(job_types=self.job_type)))

        for worker in workers_in_radius:
            worker_availabilities = self.availabilities_job_completeable_in(WorkerAvailability.objects.filter(worker=worker).order_by('start_hour', 'start_minute'))

            worker_job_times = WorkerJobTimes.objects.filter(worker=worker)
            for job_times in worker_job_times:
                availabilities = []
                job_times.start_time = datetime.datetime.fromtimestamp(job_times.start_time).replace(second=0)
                job_times.end_time = datetime.datetime.fromtimestamp(job_times.end_time).replace(second=0)
                for a in worker_availabilities:
                    if a[0] <= job_times.start_time and a[1] >= job_times.end_time:
                        availabilities += list(filter(lambda x: x[1] - x[0] >= datetime.timedelta(hours=self.time_estimate), [(a[0], job_times.start_time), (job_times.end_time, a[1])]))
                        continue
                    else:
                        availabilities.append(a)
                worker_availabilities = availabilities
            if len(worker_availabilities):
                WorkerJobTimes.objects.create(
                    job=self,
                    worker=worker,
                    start_time=worker_availabilities[0][0].replace(second=0).timestamp(),
                    end_time=worker_availabilities[0][0].replace(second=0).timestamp()+self.time_estimate*3600
                )
                self.status = Status.ASSIGNED
                self.save()
                return {'success': True, 'job': serialize_job(self)}
        return {'success': False, 'message': 'No workers available', 'job_id': self.id}

    def get_title(self):
        return self.job_type.job_type + " @ " + (self.address if self.address else f'{self.latitude}, {self.longitude}')

class WorkerJobTimes(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    start_time = models.BigIntegerField(default=0, null=False)
    end_time = models.BigIntegerField(default=0, null=False)
