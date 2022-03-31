from django.test import TestCase
from models import User, Role, Worker


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(name="kev",
                            email="kev@gmail.com",
                            password="passwordkev",
                            avatar="https://www.google.com/search?q=test+button&rlz=1C1VDKB_enUS966US966&sxsrf=APq"
                                   "-WBsCxhv1HIP18uFwX6RE-8Q784VbYQ:1648232097679&tbm=isch&source=iu&ictx=1&vet=1&fir"
                                   "=q-BMPwsD-MsVFM%252C2wZ2FOtsYzAkTM%252C_%253BsU4yah0F_GJjQM%252CWoF5y_xYpoV4lM"
                                   "%252C_%253BnDA0HSN3gZcLzM%252C66Eok6P4w7uicM%252C_%253BvS65zec_mxx5wM"
                                   "%252CNkmS2bq67ajygM%252C_%253BxKqlZ0-zc1lcJM%252CDcsJ3lV0mcnJqM%252C_"
                                   "%253BPiyFgAOvDAy1DM%252CeHv0J30Fh-J3uM%252C_%253ByQ8RCsWPEO4MZM"
                                   "%252CXYNtNAxhLRIQxM%252C_%253BzylJDqkcf1dRbM%252C66Eok6P4w7uicM%252C_"
                                   "%253Bz9odnJRZXuUZ-M%252CO5_DgXMycHr6VM%252C_%253BkWx3fQhKkZB-yM%252CtLKdSgRl"
                                   "-o3WEM%252C_%253BybsnlvI9g2OecM%252CVf9Cf5QvGqGYDM%252C_%253BdGGvjgNEf7WmHM"
                                   "%252CFZTPGoVQnl_AgM%252C_%253BVE19KSqwhaCHdM%252C_LJ2_vympbbSXM%252C_"
                                   "%253BLhO1iN84oS7kjM%252CeHv0J30Fh-J3uM%252C_%253B7zZJGRhbQUL-NM"
                                   "%252COeQ_OyvddMBYwM%252C_&usg=AI4_-kTQqNGxkk9wDxL4NYSZoHhu_oIg3g&sa=X&ved"
                                   "=2ahUKEwjH3cGF7-H2AhUvD0QIHV-hB00Q9QF6BAgCEAE#imgrc=q-BMPwsD-MsVFM",
                            phone_number="3853378828",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-111.49307,
                            balance=100,
                            role=Role.CUSTOMER,
                            )

        User.objects.create(name="Bob",
                            email="Bob@gmail.com",
                            password="passwordbob",
                            avatar="https://www.google.com/search?q=test+button&rlz=1C1VDKB_enUS966US966&sxsrf=APq"
                                   "-WBsCxhv1HIP18uFwX6RE-8Q784VbYQ:1648232097679&tbm=isch&source=iu&ictx=1&vet=1&fir"
                                   "=q-BMPwsD-MsVFM%252C2wZ2FOtsYzAkTM%252C_%253BsU4yah0F_GJjQM%252CWoF5y_xYpoV4lM"
                                   "%252C_%253BnDA0HSN3gZcLzM%252C66Eok6P4w7uicM%252C_%253BvS65zec_mxx5wM"
                                   "%252CNkmS2bq67ajygM%252C_%253BxKqlZ0-zc1lcJM%252CDcsJ3lV0mcnJqM%252C_"
                                   "%253BPiyFgAOvDAy1DM%252CeHv0J30Fh-J3uM%252C_%253ByQ8RCsWPEO4MZM"
                                   "%252CXYNtNAxhLRIQxM%252C_%253BzylJDqkcf1dRbM%252C66Eok6P4w7uicM%252C_"
                                   "%253Bz9odnJRZXuUZ-M%252CO5_DgXMycHr6VM%252C_%253BkWx3fQhKkZB-yM%252CtLKdSgRl"
                                   "-o3WEM%252C_%253BybsnlvI9g2OecM%252CVf9Cf5QvGqGYDM%252C_%253BdGGvjgNEf7WmHM"
                                   "%252CFZTPGoVQnl_AgM%252C_%253BVE19KSqwhaCHdM%252C_LJ2_vympbbSXM%252C_"
                                   "%253BLhO1iN84oS7kjM%252CeHv0J30Fh-J3uM%252C_%253B7zZJGRhbQUL-NM"
                                   "%252COeQ_OyvddMBYwM%252C_&usg=AI4_-kTQqNGxkk9wDxL4NYSZoHhu_oIg3g&sa=X&ved"
                                   "=2ahUKEwjH3cGF7-H2AhUvD0QIHV-hB00Q9QF6BAgCEAE#imgrc=q-BMPwsD-MsVFM",
                            phone_number="(385) 337-8829",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-112.49307,
                            balance=250,
                            role=Role.CUSTOMER,
                            )

        User.objects.create(name="Worker1",
                            email="Worker1@gmail.com",
                            password="Worker1",
                            avatar="https://www.google.com/search?q=test+button&rlz=1C1VDKB_enUS966US966&sxsrf=APq"
                                   "-WBsCxhv1HIP18uFwX6RE-8Q784VbYQ:1648232097679&tbm=isch&source=iu&ictx=1&vet=1&fir"
                                   "=q-BMPwsD-MsVFM%252C2wZ2FOtsYzAkTM%252C_%253BsU4yah0F_GJjQM%252CWoF5y_xYpoV4lM"
                                   "%252C_%253BnDA0HSN3gZcLzM%252C66Eok6P4w7uicM%252C_%253BvS65zec_mxx5wM"
                                   "%252CNkmS2bq67ajygM%252C_%253BxKqlZ0-zc1lcJM%252CDcsJ3lV0mcnJqM%252C_"
                                   "%253BPiyFgAOvDAy1DM%252CeHv0J30Fh-J3uM%252C_%253ByQ8RCsWPEO4MZM"
                                   "%252CXYNtNAxhLRIQxM%252C_%253BzylJDqkcf1dRbM%252C66Eok6P4w7uicM%252C_"
                                   "%253Bz9odnJRZXuUZ-M%252CO5_DgXMycHr6VM%252C_%253BkWx3fQhKkZB-yM%252CtLKdSgRl"
                                   "-o3WEM%252C_%253BybsnlvI9g2OecM%252CVf9Cf5QvGqGYDM%252C_%253BdGGvjgNEf7WmHM"
                                   "%252CFZTPGoVQnl_AgM%252C_%253BVE19KSqwhaCHdM%252C_LJ2_vympbbSXM%252C_"
                                   "%253BLhO1iN84oS7kjM%252CeHv0J30Fh-J3uM%252C_%253B7zZJGRhbQUL-NM"
                                   "%252COeQ_OyvddMBYwM%252C_&usg=AI4_-kTQqNGxkk9wDxL4NYSZoHhu_oIg3g&sa=X&ved"
                                   "=2ahUKEwjH3cGF7-H2AhUvD0QIHV-hB00Q9QF6BAgCEAE#imgrc=q-BMPwsD-MsVFM",
                            phone_number="3853378830",
                            home_address="1265 n 400 e logan utah 84341",
                            home_latitude=41.45176,
                            home_longitude=-112.49307,
                            balance=250,
                            role=Role.WORKER,
                            )

        worker1 = User.objects.get(name="Worker1")

        Worker.objects.create(user=worker1,
                              job_types=None,
                              )

    def test_user_password_true(self):
        kevin = User.objects.get(name="kev")

        self.assertTrue(User.compare_password(kevin, "passwordkev"))

    def test_user_password_false(self):
        kevin = User.objects.get(name="kev")

        self.assertFalse(User.compare_password(kevin, "wrong"))

    def test_other_user_password(self):
        kevin = User.objects.get(name="kev")
        bob = User.orbjects.get(name="Bob")

        self.assertFalse(User.compare_password(kevin, "passwordbob"))

    def test_change_password(self):
        kevin = User.objects.get(name="kev")

        kevin.set_password(self, "password2")

        self.assertTrue(User.compare_password(kevin, "password2"))


    def test_strip_phone_number(self):

        self.assertTrue(User.strip_phone_number("(385) 337-8828") == "3853378828")
        self.assertTrue(User.strip_phone_number("3853378828") == "3853378828")
        self.assertFalse(User.strip_phone_number("(385) 337-8828") == "(385) 337-8828")
        self.assertFalse(User.strip_phone_number("3853378828") == "(385) 337-8828")