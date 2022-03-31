from django.test import TestCase
from jobs.models import Job, JobType, WorkerJobTimes, Status
from authentication.models import User, Role, Worker, WorkerAvailability


class UserTestCase(TestCase):
    def setUp(self):
        customer = User.objects.create(name="kev",
                            email="kev@gmail.com",
                            password="passwordkev",
                            avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                            phone_number="3853378828",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-111.49307,
                            balance=100,
                            role=Role.CUSTOMER,
                            )


        User.objects.create(name="kevworker",
                            email="kevw@gmail.com",
                            password="passwordkevw",
                            avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                            phone_number="3853374828",
                            home_address="1265 n 500 e logan utah 84341",
                            home_latitude=41.35176,
                            home_longitude=-111.39307,
                            balance=200,
                            role=Role.WORKER,
                            )
        

        jobtype1 = JobType.objects.create(
                            job_type="Weeding",
                            icon="GiGrass",
                            archived=False,
                            )

        worker1 = User.objects.get(name="kevworker")

        testWorker = Worker.objects.create(user=worker1)
        testWorker.job_types.set(JobType.objects.all())      

        job1 = Job.objects.create(user=customer,
                            price=20.25,
                            time_estimate=2.5,
                            start_time=	1649253600,
                            end_time= 1649379600,
                            address="1265 n 400 e logan utah 84341",
                            latitude=41.45176,
                            longitude=-112.49307,
                            comment="Test comment",
                            status=Status.AVAILABLE,
                            job_type=jobtype1,
                            )

        Job.objects.create(user=customer,
                            price=352.25,
                            time_estimate=1.5,
                            start_time=1649098800,
                            end_time=1649113200,
                            latitude=41.55176,
                            longitude=-111.49307,
                            comment="asdfasdfasdfas",
                            status=Status.AVAILABLE,
                            job_type=jobtype1,
                            )

        WorkerJobTimes.objects.create(worker=testWorker,
                            job=job1,
                            start_time=164875705,
                            end_time=1648951440,
        )

        a1 = WorkerAvailability.objects.create(day=1,
                            start_hour=12,
                            start_minute=30,
                            end_hour=15,
                            end_minute=30,  
                            worker_id=testWorker.id,
        )

        a1 = WorkerAvailability.objects.create(day=3,
                            start_hour=8,
                            start_minute=0,
                            end_hour=19,
                            end_minute=45,  
                            worker_id=testWorker.id,
        )

        a1 = WorkerAvailability.objects.create(day=5,
                            start_hour=8,
                            start_minute=30,
                            end_hour=19,
                            end_minute=10,  
                            worker_id=testWorker.id,
        )

        a1 = WorkerAvailability.objects.create(day=6,
                            start_hour=10,
                            start_minute=30,
                            end_hour=14,
                            end_minute=59,  
                            worker_id=testWorker.id,
        )

    def test_toggle_job_type(self):
        jobtype1 = JobType.objects.get(job_type="Weeding")
        jobtype1.try_toggle_archived()
        jobtype1.save()
        self.assertEqual(jobtype1.archived, True)

        jobtype1.try_toggle_archived()
        jobtype1.save()
        self.assertEqual(jobtype1.archived, False)

    def test_assign_job_outside_available_range(self):
        job = Job.objects.get(price=352.25)
        job.try_assign_worker()
        self.assertEqual(job.status, Status.AVAILABLE)
    
    def test_worker_availability_days(self):
        user = User.objects.get(name="kevworker")
        worker = Worker.objects.get(user=user)
        availabilities = WorkerAvailability.objects.filter(worker=worker)
        self.assertEqual(availabilities[0].day, 1)
        self.assertEqual(availabilities[1].day, 3)
        self.assertEqual(availabilities[2].day, 5)
        self.assertEqual(availabilities[3].day, 6)

    def test_worker_availability_times(self):
        user = User.objects.get(name="kevworker")
        worker = Worker.objects.get(user=user)
        availabilities = WorkerAvailability.objects.filter(worker=worker)

        self.assertEqual(availabilities[0].start_hour, 12)
        self.assertEqual(availabilities[0].start_minute, 30)
        self.assertEqual(availabilities[0].end_hour, 15)
        self.assertEqual(availabilities[0].end_minute, 30)
        self.assertEqual(availabilities[1].start_hour, 8)
        self.assertEqual(availabilities[1].start_minute, 0)
        self.assertEqual(availabilities[1].end_hour, 19)
        self.assertEqual(availabilities[1].end_minute, 45)
        self.assertEqual(availabilities[2].start_hour, 8)
        self.assertEqual(availabilities[2].start_minute, 30)
        self.assertEqual(availabilities[2].end_hour, 19)
        self.assertEqual(availabilities[2].end_minute, 10)
        self.assertEqual(availabilities[3].start_hour, 10)
        self.assertEqual(availabilities[3].start_minute, 30)
        self.assertEqual(availabilities[3].end_hour, 14)
        self.assertEqual(availabilities[3].end_minute, 59)


