# Testing

Throughout this project there have been many test that we have conducted to make sure that our program runs correctly.

### Unit Tests
There can be some unit tests found in [backend/authentication/tests.py](../backend/authentication/tests.py)

### Regression Tests
We preformed regression tests when we changed parts of our code. Whenever we edited the User sign up/ log in we would go 
through it and make sure tokens were still being handled correctly and that users can still request new ones.

Another point of regression testing includes testing the worker assignments; when we'd add changes to the scheduling
system it was necessary to go back through and test some edge cases:
1) Worker availability continues over a day in UTC
2) Worker availability is scheduled over Saturday to the next Sunday
3) A job continues over several days

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
a job, and an availability. This test in [backend/jobs/management/commands/testavailability.py)(../backend/jobs/management/commands/testavailability.py]
tested several components of the system; the production database, that workers can exist, that jobs can exist, and that
workers can correctly be assigned jobs. This is different from a unit test because it does not check a single module or
independent module, rather it attempts to show that several moving parts of the system are working correctly.

### Usability Tests
During our stand up meetings we would go through together what each person worked on and each member individually would
follow along making sure that the program worked for everyone and that it was clear how to do everything. 

We wanted the UI to look really good and be intuitive to the user. During standups we'd test this by making sure each
new change since the last standup was accepted by all of the team members.

### Other Bugs Encountered 
Any bugs we encounter will be put in as an issue on github where we will be able to talk about them and assign someone 
to fix them.

There seems to be some rounding errors for our money. We believe this is due to our money being stored in a FloatField, 
so we will change it to a decimal field and perform regression testing to make sure that everything still works 
correctly. 
