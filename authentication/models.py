from django.db import models

# Create your models here.

class Role(models.TextChoices):
  OWNER = "owner"
  CUSTOMER = "customer"
  WORKER = "worker"

class User(models.Model):
  name = models.CharField(max_length=50)
  email = models.EmailField(max_length=100)
  password = models.CharField(max_length=255)
  avatar = models.CharField(max_length=255)
  phone_number = models.CharField(max_length=16)
  home_address = models.CharField(max_length=255)
  home_latitude = models.FloatField(null=True)
  home_longitude = models.FloatField(null=True)

  balance = models.FloatField(default=0)

  role = models.CharField(
    max_length=20,
    choices=Role.choices,
    default=Role.CUSTOMER,
  )

class Worker(models.Model):
  user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
  availability = models.CharField(max_length=1024)
