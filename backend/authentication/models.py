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
    token = jwt.encode({
        'id': self.pk,
        'name': self.name,
        'exp': int((datetime.now() + timedelta(hours=3)).strftime('%s'))
    }, settings.SECRET_KEY, algorithm='HS256')

    return token
  
  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['email', 'phone_number'], name='unique_email_phone'),
    ]

class Worker(models.Model):
  user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
  
  def update_availability(self, new_availability):
    # TODO: Delete all old availability entries associated with this worker
    #       and create new ones 
    availabilities = WorkerAvailability.objects.filter(worker=self)

class WorkerAvailability(models.Model):
  worker = models.ForeignKey(Worker, on_delete=models.CASCADE)

  # Day 0 = Sunday
  day = models.IntegerField(default=0, null=False)
  start_hour = models.IntegerField(default=0, null=False)
  start_minute = models.IntegerField(default=0, null=False)
  end_hour = models.IntegerField(default=23, null=False)
  end_minute = models.IntegerField(default=59, null=False)