from django.test import TestCase
from authentication.models import User, Role, Worker


class UserTestCase(TestCase):
    def setUp(self):
        kev = User.objects.create(name="kev",
                            email="kev@gmail.com",
                            avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                            phone_number="3853378828",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-111.49307,
                            balance=100,
                            role=Role.CUSTOMER,
                            )
        kev.set_password("passwordkev")
        kev.save()

        bob = User.objects.create(name="Bob",
                            email="Bob@gmail.com",
                            avatar="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
                            phone_number="(385) 337-8829",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-112.49307,
                            balance=250,
                            role=Role.CUSTOMER,
                            )
        bob.set_password("passwordbob")
        bob.save()


        workerone = User.objects.create(name="Worker1",
                            email="Worker1@gmail.com",
                            avatar="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                            phone_number="3853378830",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-112.49307,
                            balance=250,
                            role=Role.WORKER,
                            )
        workerone.set_password("Worker1")
        workerone.save()

        owner = User.objects.create(name="Site Owner",
                            email="siteOwner@gmail.com",
                            phone_number="4353432428",
                            home_address="4205 Old Main Hill Logan UT 84322",
                            home_latitude=41.34176,
                            home_longitude=-111.26307,
                            balance=1000,
                            role=Role.OWNER,
        )
        owner.set_password("helloworld")
        owner.save()

        Worker.objects.create(user=workerone)

    def test_user_password_true(self):
        kevin = User.objects.get(name="kev")

        self.assertTrue(kevin.compare_password("passwordkev"))

    def test_user_password_false(self):
        kevin = User.objects.get(name="kev")

        self.assertFalse(kevin.compare_password("wrong"))

    def test_other_user_password(self):
        kevin = User.objects.get(name="kev")

        self.assertFalse(kevin.compare_password("passwordbob"))

    def test_change_password(self):
        kevin = User.objects.get(name="kev")

        kevin.set_password("password2")
        kevin.save()

        self.assertTrue(kevin.compare_password("password2"))


    def test_strip_phone_number(self):

        self.assertTrue(User.strip_phone_number("(385) 337-8828") == "3853378828")
        self.assertTrue(User.strip_phone_number("3853378828") == "3853378828")
        self.assertFalse(User.strip_phone_number("(385) 337-8828") == "(385) 337-8828")
        self.assertFalse(User.strip_phone_number("3853378828") == "(385) 337-8828")