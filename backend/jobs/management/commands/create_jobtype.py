from django.core.management.base import BaseCommand, CommandError
# from authentication.models import Jobtype

# class Command(BaseCommand):
#   def add_arguments(self, parser):
#     parser.add_argument(
#       '--job_type',
#       type=str,
#       help='Specify the job type',
#     )

#     parser.add_argument(
#       '--icon',
#       type=str,
#       help='Specify the job type icon',
#     )

#     parser.add_argument(
#       '--status',
#       type=enum('archived', 'available'), 
#       help='Specify whether the job type is archived or available',
#     )

#   def handle(self, *args, **options):
#     print(options)
#     job_type = options['job_type']
#     icon = options['icon']
#     status = options['status']

#     newJobType = JobType(job_type=job_type, icon=icon, status=status)
#     newJobType.save()