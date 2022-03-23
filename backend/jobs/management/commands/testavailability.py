from django.test import TestCase
from django.core.management.base import BaseCommand, CommandError
from authentication.models import Worker, WorkerAvailability
from jobs.models import Job

class Command(BaseCommand):
  def handle(self, *args, **options):
    j = Job.objects.filter(pk=3)
    w = Worker.objects.get(pk=1)
    self.stdout.write(str(j.first().assign_worker()))



