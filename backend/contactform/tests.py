from django.test import TestCase
from contactform.models import Submission, Status
from authentication.models import User, Role, Worker
from jobs.models import Job, JobType, Status as JobStatus

# Create your tests here.

class SubmissionTestCase(TestCase):
    def setUp(self):
        user=User.objects.create(name="kev",
                    email="kev@gmail.com",
                    avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                    phone_number="3853378828",
                    home_address="1265 n 400 e logan utah 84341",
                    home_latitude=41.45176,
                    home_longitude=-111.49307,
                    balance=100,
                    role=Role.CUSTOMER,
                )
        user.set_password("")
        user.save()

        JobType.objects.create(
                job_type = "job-type",
                icon = "icon",
                archived = False
                )
        Job.objects.create(
                    user = User.objects.get(name="kev"),
                    price = 10.01,
                    time_estimate = 100000,
                    start_time = 1000000,
                    end_time = 1100000,
                    address = User.objects.get(name="kev").home_address,
                    latitude = User.objects.get(name="kev").home_latitude,
                    longitude = User.objects.get(name="kev").home_longitude,
                    comment = "New Comment",
                    status = JobStatus.AVAILABLE,
                    job_type = JobType.objects.get(job_type="job-type")
                )
        Submission.objects.create(
                    user = User.objects.get(name="kev"),
                    job = Job.objects.get(user=User.objects.get(name="kev")),
                    email = User.objects.get(name="kev").email,
                    body = "Message body",
                    status = Status.OPEN
                )
        Submission.objects.create(
                   email = "train@test.com",
                   body = "Holy cow! A message for the admin!",
                   status = Status.OPEN
               )
   
    def test_user_submission(self):
        submission = Submission.objects.get(user = User.objects.get(name="kev"))
        self.assertTrue(submission.user.phone_number == "3853378828")
        self.assertTrue(submission.job.price == 10.01)
        
    def test_anonymous_submission(self):
        submission = Submission.objects.get(email="train@test.com")
        self.assertTrue(submission.body == "Holy cow! A message for the admin!")