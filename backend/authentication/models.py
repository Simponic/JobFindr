from django.db import models
from django.conf import settings
import datetime
import jwt
import bcrypt

# Create your models here.
class Role(models.TextChoices):
  OWNER = "owner"
  CUSTOMER = "customer"
  WORKER = "worker"

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
    self.password = bcrypt.hashpw(password, bcrypt.gensalt())

  def compare_password(self, password):
    return bcrypt.checkpw(password, self.password)

  def get_jwt_token(self):
    dt = datetime.now() + datetime.timedelta(hours=1)

    token = jwt.encode({
        'id': self.pk,
        'exp': int(dt.strftime('%s'))
    }, settings.SECRET_KEY, algorithm='HS256')

    return token.decode('utf-8')

class Worker(models.Model):
  user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
  availability = models.CharField(max_length=1024)
