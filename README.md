# Job Finder
This is a job finder where users are able to create a job or accept a job.

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
This project uses the [Django Framework](https://djangoproject.com) to resolve requests and mutate objects stored in a SQLite database.

To run the app locally first install python3 and pip3 if they are not yet present on your system. 

Then, clone the repo and `cd` into it
``` bash
git clone git@github.com:Simponic/cs3450-team-one.git jobfinder
cd jobfinder
```

To install dependencies
``` bash
pip3 install -r requirements.txt
```

Migrate your database
``` bash
python3 manage.py migrate
```

And finally run the server
``` bash
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
Once you've cloned the repo (and assuming you're a "collaborator"), you have write-access; changes you make can be directly commited to the `main` branch. Though this should be done only for small changes, like documentation, which are approved by the team.

Generally, the workflow of making a feature branch starts with the assigning of a task/issue to a team member. Once work is able to begin on that task, the assigned team member will put that task card into the "In Progress" column. Then that team member, on their local environment, will branch off `main` with a relevant branch name. All further development on this task will continue on that branch, until it is ready to be reviewed. 

Once the task is ready to be reviewed, the assigned team member will push their local feature branch onto `origin` and create a Pull Request to merge their branch into `main` so others can also view their work. The pull request will be under heavy subjugation in Code Review, and if it survives the perilous trials of fire, will be merged into the `main` branch.

# Testing
## Unit Testing
Please use the `unittest` framework to write unit tests. Documentation on writing unit tests for Django can be found [on the official Django site](https://docs.djangoproject.com/en/4.0/topics/testing/).

## System Testing
Randomly click on things and make an issue if it's broken (TODO: write more).

# Deploying
Deployment is done with Heroku, since they have a free tier. This repo is hosted at https://find-job-app.herokuapp.com. Only the user that hosts the `upstream` branch through their account on Heroku may push changes from the main branch to production.
