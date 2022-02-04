# JobFind
This is a job finder where users can create a job or accept a job.

# Project Members
+ [Hailey Dennis](https://github.com/haileydennis)
+ [Jake Cogswell](https://github.com/jdasnake81)
+ [James Field](https://github.com/PineappleMiner)
+ [Logan Hunt](https://github.com/Simponic)

# Organization / Name Scheme
The `docs` directory contains documentation relevant to the project. 

The `static` directory contains static content (css, images, possibly js in the future).

Features requiring modularization will be organized into seperate "apps". For example, non-dynamic pages are controlled by the `pages` "app" (like the homepage and other static pages in the future).

The root "app" is in `findjobapp`. Configuration in this directory is global in that it affects the runtime of the whole app.

General naming convention and organization should try to follow [this guide](https://streamhacker.com/2011/01/03/django-application-conventions/) which was chosen arbitrarily to make sure there is at least some baseline standard.

# Getting It Up And Running (Tools / Building Locally)
This project uses the [Django Framework](https://djangoproject.com) to resolve requests and mutate objects stored in an SQLite database. For the frontend, we are using [React](https://reactjs.org/).

To run the app locally first install python3 and pip3 if they are not yet present on your system. 

Then, clone the repo and `cd` into it
```bash
git clone git@github.com:Simponic/cs3450-team-one.git jobfinder
cd jobfinder
```

TODO: USE DOCKER

And finally run the server
```bash
python3 manage.py runserver
```

Note that you might need to set your environment variables in your shell. The file `.env.example` provides a list of example environment variables you need to set. You can use the defaults set in `.env.example` by running 
```bash
export $(cat .env.example)
```

# Meta-tools
Most communication between members are done over [Discord](https://discord.com).

Development is version-controlled with git (obviously). GitHub Projects (an alternative to Trello) is used to assign team members tasks, track issues, and further coordinate development efforts. These integrate very nicely with the workflow of git; closing tasks when Pull Requests are made, containerizing conversations on features, etc.

# Collaborating With Git And GitHub
Once you've cloned the repo (and assuming you're a "collaborator"), you have write-access; changes you make can be directly committed to the `main` branch. Though this should be done only for small changes, like documentation, which are approved by the team.

Generally, the workflow of making a feature branch starts with the assigning of a task/issue on the backlog to a team member. Once work is able to begin on that task, the assigned team member will put that task card into the "In Progress" column. Then that team member, on their local environment, will branch off `main` with a relevant branch name. All further development on this task will continue on that branch until it is ready to be reviewed. 

Once the task is ready to be reviewed, the assigned team member will push their local feature branch onto `origin` and create a Pull Request to merge their branch into `main` so others can also view their work. The pull request will be under heavy subjugation in Code Review, and if it survives the perilous trials of fire, will be merged into the `main` branch.

# Unit Testing
Please use the `unittest` framework to write unit tests. Documentation on writing unit tests for Django can be found [on the official Django site](https://docs.djangoproject.com/en/4.0/topics/testing/).

# System Testing
Since system testing isn't (easily) automatable, please follow these steps when trying out system testing: (devs are notoriously good at QA right?...)

1. Look for edge cases
2. Always make sure user input is handled correctly
3. Test and re-test the same feature
4. Click on random buttons to see if stuff breaks. Bonus points if you crash your local server!!!

Once you have found a bug or inconvenience to the user, create an issue on GitHub. In this issue please include steps to reproduce the bug (preferably on the main branch if it's reproducible there).
As discussed above in the contribution guidelines, the issue will then be assigned to the backlog to die.

# Deploying
Deployment is done with Heroku since they have a free tier. This repo is hosted at https://find-job-app.herokuapp.com. Only the user that hosts the `upstream` branch through their account on Heroku may push changes from the main branch to production.
