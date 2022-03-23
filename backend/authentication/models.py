from django.db import models
from django.conf import settings
from datetime import datetime, timedelta
import jwt
import bcrypt

class Role(models.TextChoices):
  OWNER = 'owner'
  CUSTOMER = 'customer'
  WORKER = 'worker'

class User(models.Model):
  name = models.CharField(max_length=50, null=False)
  email = models.EmailField(max_length=100, null=False)
  password = models.CharField(max_length=255, null=False)
  avatar = models.CharField(max_length=255, null=True)
  phone_number = models.CharField(max_length=16, null=False)
  home_address = models.CharField(max_length=255, null=True)
  home_latitude = models.FloatField(null=True)
  home_longitude = models.FloatField(null=True)

  balance = models.FloatField(default=0)

  role = models.CharField(
    max_length=20,
    choices=Role.choices,
    default=Role.CUSTOMER,
  )

  def set_password(self, password): 
    self.password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt()).decode('utf8')

  def compare_password(self, password):
    return bcrypt.checkpw(password.encode('utf8'), self.password.encode('utf8'))

  def get_jwt_token(self):
    return jwt.encode({
      'id': self.pk,
      'name': self.name,
      'role': self.role,
      'exp': int((datetime.now() + timedelta(hours=6)).strftime('%s'))
    }, settings.JWT_SECRET, algorithm='HS256')

  @staticmethod
  def strip_phone_number(phone_number):
    return phone_number.replace('+', '').replace('-', '').replace('(', '').replace(')', '').replace(' ', '') 
  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['email', 'phone_number'], name='unique_email_phone'),
    ]

class Worker(models.Model):
  user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
  job_types = models.ManyToManyField('jobs.JobType', blank=True)
  
  def update_availability(self, new_availabilities):
    WorkerAvailability.objects.filter(worker_id=self.id).delete()
    for availability in new_availabilities:
      availability.save()

class WorkerAvailability(models.Model):
  worker = models.ForeignKey(Worker, on_delete=models.CASCADE)

  # Day 0 = Sunday
  day = models.IntegerField(default=0, null=False)
  start_hour = models.IntegerField(default=0, null=False)
  start_minute = models.IntegerField(default=0, null=False)
  end_hour = models.IntegerField(default=23, null=False)
  end_minute = models.IntegerField(default=59, null=False)

  @staticmethod
  def union_datetime_ranges_over_days(availabilities):
    # Availabilities is a list of tuples containing (start_time, end_time)
    # Returns a list of tuples containting (start_time, end_time) unioned over days if they are withing a minute of each other
    # ex [[(day=0, time=12:50), (day=0, time=23:59)], [(day=1, time=00:00), (day=1, time=12:00)]] -> [(day=0, time=12:50), (day=1, time=12:00)]
    work_ranges = []
    for i in range(len(availabilities)):
      s = availabilities[i]
      if ((i < len(availabilities)-1) and ((s[1].weekday() + 1) % 7) == (availabilities[i+1][0].weekday()) and s[1].hour == 23 and s[1].minute == 59 and availabilities[i+1][0].hour == 0 and availabilities[i+1][0].minute == 0):
        work_ranges.append((s[0], availabilities[i+1][1]))
      else:
        work_ranges.append(s)
    if len(work_ranges) <= 1:
      return work_ranges
    elif len(work_ranges) > 1:
      non_overlapped = [work_ranges[0]]
      for i in range(1, len(work_ranges)):
        if not work_ranges[i-1][1] == work_ranges[i][1]:
          non_overlapped.append(work_ranges[i])
      return non_overlapped