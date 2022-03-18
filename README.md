# JobFind
This is a job finder where users can create a job or accept a job.

# Project Members
+ [Hailey Dennis](https://github.com/haileydennis)
+ [Jake Cogswell](https://github.com/jdasnake81)
+ [James Field](https://github.com/PineappleMiner)
+ [Logan Hunt](https://github.com/Simponic)

# Organization / Name Scheme
The `docs` directory contains documentation relevant to the project. 

This project uses the [Django Framework](https://djangoproject.com) to resolve requests and mutate objects stored in a PostgreSQL database. For the frontend, we are using [React](https://reactjs.org/). [Nginx](https://nginx.com) is used to act as a reverse proxy for HTTP requests. [Docker](https://docker.com) is used to ease the build process of the app in development (and production in the future).

All the frontend code is in `frontend`, and likewise for the backend.

General naming convention and organization should try to follow [this guide](https://streamhacker.com/2011/01/03/django-application-conventions/) which was chosen arbitrarily to make sure there is at least some baseline standard.

# Getting It Up And Running (Tools / Building Locally)
Credit note: A lot of the Docker stuff in this repo is from [this blog post](https://testdriven.io/blog/django-spa-auth/).

First, install:
* `docker` [instructions for Mac/Windows](https://docs.docker.com/desktop/) [instructions for Linux](https://docs.docker.com/engine/)
* `docker-compose` [instructions](https://docs.docker.com/compose/install/)

Then, clone the repo and `cd` into it
```bash
git clone git@github.com:Simponic/cs3450-team-one.git jobfinder
cd jobfinder
```

You will need to set the following variables in a .env file in the root directory:
* REACT_APP_MAPS_API_KEY (contact Logan for one if you don't want to make one [on Google Cloud](https://developers.google.com/maps/documentation/javascript/get-api-key))

And run the DB, Frontend, and Backend with one command:
```bash
sudo docker-compose up -d --build
```

The app should be live at `http://localhost:81`.

You might find yourself needing to do migrations. To do so, first list all the running docker containers:
```bash
$ sudo docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS          PORTS                                       NAMES
be5d05526668   project-v2_backend    "python manage.py ru…"   6 minutes ago    Up 6 minutes    8000/tcp                                    project-v2_backend_1
959151ab9c21   project-v2_frontend   "docker-entrypoint.s…"   15 minutes ago   Up 12 minutes   3000/tcp                                    project-v2_frontend_1
50536f1737d5   postgres:14.1         "docker-entrypoint.s…"   18 minutes ago   Up 13 minutes   0.0.0.0:5438->5432/tcp, :::5438->5432/tcp   project-v2_db_1
```

And select the container ID of the image running the backend; in this case `be5d05526668`. Start a shell.

```bash
$ sudo docker exec -it be5d05526668 /usr/local/bin/python3 manage.py migrate 
Operations to perform:
  Apply all migrations: admin, auth, authentication, contenttypes, sessions
...
```
To seed initial values into the database:
```bash
$ sudo docker exec -it be5d05526668 /usr/local/bin/python3 manage.py loaddata <fixture-file-name>
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
Deployment will be automated with Docker. Possibly hosted on a Rasperry Pi or something.

# Helpful commands

## Interacting with DB
To connect to the database hosted with docker, first find the container id associated with the `postgres` image:
```bash
$ sudo docker ps
CONTAINER ID   IMAGE                      COMMAND                  CREATED        STATUS          PORTS                                       NAMES
1a2205c294ab   project-v2_reverse_proxy   "/docker-entrypoint.…"   40 hours ago   Up 26 minutes   0.0.0.0:81->80/tcp, :::81->80/tcp           project-v2_reverse_proxy_1
4a497a6396cf   project-v2_frontend        "docker-entrypoint.s…"   40 hours ago   Up 26 minutes   3000/tcp                                    project-v2_frontend_1
5154452292bd   postgres:14.1              "docker-entrypoint.s…"   40 hours ago   Up 26 minutes   0.0.0.0:5438->5432/tcp, :::5438->5432/tcp   project-v2_db_1
d20c2566bcbe   project-v2_backend         "python manage.py ru…"   40 hours ago   Up 26 minutes   8000/tcp                                    project-v2_backend_1
```

And connect to a psql "repl":
```bash
$ sudo docker exec -it 5154452292bd /usr/bin/psql -U postgres
psql (14.1 (Debian 14.1-1.pgdg110+1))
Type "help" for help.

postgres=# 
```

## Installing New Libraries
In the case that you need to install a new npm package, do the same as above to find the container id of the frontend, then:

```bash
$ sudo docker exec -it 4a497a6396cf /usr/local/bin/npm install <packages>
```

And make sure to let your teammates know they need to ```sudo docker exec -it 4a497a6396cf /usr/local/bin/npm install .```
