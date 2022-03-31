# Testing

Throughout this project there have been many test that we have conducted to make sure that our program runs correctly.

### Unit Tests
There can be some unit tests found in [backend/authentication/tests.py](../backend/authentication/tests.py)

### Regression Tests
We preformed regression tests when we changed parts of our code. Whenever we edited the User sign up/ log in we would go 
through it and make sure it still functioned correctly.

### System Tests
Since system testing isn't (easily) automatable, please follow these steps when trying out system testing: (devs are notoriously good at QA right?...)

1. Look for edge cases
2. Always make sure user input is handled correctly
3. Test and re-test the same feature
4. Click on random buttons to see if stuff breaks. Bonus points if you crash your local server!!!


We have all regularly ran our program and tested the system as a whole sometimes focusing on specific parts but usually
just going through and making sure everything works as expected.

### Usability Tests
During our stand up meetings we would go through together what each person worked on and each member individually would
follow along making sure that the program worked for everyone and that it was clear how to do everything. 


### Other Bugs Encountered 
Any bugs we encounter will be put in as an issue on github where we will be able to talk about them and assign someone 
to fix them.

There seems to be some rounding errors for our money. We believe this is due to our money being stored in a FloatField, 
so we will change it to a decimal field and preform regression testing to make sure that everything still works 
correctly. 
