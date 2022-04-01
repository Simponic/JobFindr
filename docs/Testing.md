# Testing

Throughout this project there have been many test that we have conducted to make sure that our program runs correctly.

### Unit Tests
There can be some unit tests found in [backend/authentication/tests.py](../backend/authentication/tests.py), [backend/jobs/tests.py](../backend/jobs/tests.py), and [backend/contactform/tests.py](../backend/contactform/tests.py).

First, list all the running docker containers:
```bash
$ sudo docker ps
CONTAINER ID   IMAGE                      COMMAND                  CREATED        STATUS          PORTS                                       NAMES
1a2205c294ab   project-v2_reverse_proxy   "/docker-entrypoint.…"   40 hours ago   Up 26 minutes   0.0.0.0:81->80/tcp, :::81->80/tcp           project-v2_reverse_proxy_1
4a497a6396cf   project-v2_frontend        "docker-entrypoint.s…"   40 hours ago   Up 26 minutes   3000/tcp                                    project-v2_frontend_1
5154452292bd   postgres:14.1              "docker-entrypoint.s…"   40 hours ago   Up 26 minutes   0.0.0.0:5438->5432/tcp, :::5438->5432/tcp   project-v2_db_1
d20c2566bcbe   project-v2_backend         "python manage.py ru…"   40 hours ago   Up 26 minutes   8000/tcp                                    project-v2_backend_1
```

And select the container ID of the image running the backend; in this case `d20c2566bcbe`. Start a shell.

Run tests using:
```bash
$ sudo docker exec -it d20c2566bcbe /usr/local/bin/python3 manage.py test <test-module>
Current test module:
	jobs.tests
	authentication.tests
	contactform.tests
...
```

Or to run all tests simply don't instantiate a test module:
```bash
$ sudo docker exec -it d20c2566bcbe /usr/local/bin/python3 manage.py test
Found 11 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...........
----------------------------------------------------------------------
Ran 11 tests in 7.133s

OK
Destroying test database for alias 'default'...
```

### Regression Tests
We performed regression tests when we changed parts of our code. Whenever we edited the User sign up/ log in we would go 
through it and make sure tokens were still being handled correctly and that users can still request new ones.

Another point of regression testing includes testing the worker assignments; when we'd add changes to the scheduling
system it was necessary to go back through and test some edge cases:
1) Worker availability continues over a day in UTC
2) Worker availability is scheduled over Saturday to the next Sunday
3) A job continues over several days

#### Owner Portal Regression Tests
* Issue: Other account roles besides the owner can still access the page without getting a 'page not found' div.
	* Status: Fixed

* Issue: Toggling the contact form status doesn't update the list as expected.
	* Status: Fixed

* Issue: The list isn't sorted to show most recent jobs first, as expected.
	* Status: Fixed

* Issue: Non-owner roles can access the create job type page.
	* Status: Fixed

* Issue: Inappropriate error handling for job types whose icons and names are not unique.
	* Status: Decided it makes sense to allow this with the nature of job type archiving.

### System Tests
Since system testing isn't (easily) automatable, please follow these steps when trying out system testing: (devs are notoriously good at QA right?...)

1. Look for edge cases
2. Always make sure user input is handled correctly
3. Test and re-test the same feature
4. Click on random buttons to see if stuff breaks. Bonus points if you crash your local server!!!


We have all regularly ran our program and tested the system as a whole sometimes focusing on specific parts but usually
just going through and making sure everything works as expected. This is the main testing method we used to find bugs
in our program. In this last sprint, we've created an issue where everyone can post minor bugs they find while testing
edge cases and program correctness (handling data).

As an example, when testing the worker assignments a system test was included in an automated script to find a worker,
a job, and an availability. This system test tested several components of the system; the production database, that workers can exist, that jobs can exist, and that
workers can correctly be assigned jobs. This is different from a unit test because it does not check a single module or
independent module, rather it attempts to show that several moving parts of the system are working correctly.

#### Owner Portal Regression Tests
* Portal
	* Expected behavior: Only the owner can access this page. From here, they can access pages to view/edit users,
		jobs, forms, and job types.
	* Actual behavior: See regression tests. This is now behaving as expected.

* Site Users
	* Expected behavior: The owner can view every user on the site sorted ascending by id. If they click on a user, they are taken to the
		edit profile page and able to make updates. 
	* Actual behavior: This behaves as expected.

* Contact Forms
	* Expected behavior: The owner can view all contact forms submitted to the site including necessary data. These are
		sorted first by status (open forms at the top), then by most recent id. They can edit the status by toggling a
		button between 'open' and 'resolved.'
	* Actual behavior: See regression tests. This is now behaving as expected.

* All Jobs
	* Expected behavior: The owner can view every job on the site, sorted descending by id. If they click on a job they
		are taken to the job page where they will have access to edit the job. 
	* Actual behavior: See regression tests. This is now behaving as expected.

* Job Types
	* Expected behavior: The owner can view all job types and toggle their status between 'active' and 'archived.' They
		can also access a page to create new job types from here, with the ability to choose a name and icon. The form is
		validated to make sure the icon exists, but the job type and icon aren't already being used.
	* Actual behavior: See regression tests. This is now behaving as expected.

### Usability Tests
During our stand up meetings we would go through together what each person worked on and each member individually would
follow along making sure that the program worked for everyone and that it was clear how to do everything. 

We wanted the UI to look really good and be intuitive to the user. During standups we'd test this by making sure each
new change since the last standup was accepted by all of the team members.

Prior to milestone 3, we each had someone outside our project that isn't familiar with coding test the site. We noted
bugs found throughout this process in an issue on GitHub.

### Other Bugs Encountered 
Any bugs we encounter will be put in as an issue on github where we will be able to talk about them and assign someone 
to fix them. 

There seems to be some rounding errors for our money. We believe this is due to our money being stored in a FloatField, 
so we will change it to a decimal field and perform regression testing to make sure that everything still works 
correctly.
