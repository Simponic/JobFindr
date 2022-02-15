# Job Find

## Project Overview
This project aims to provide a platform for people who perform yard-work (workers) to find jobs in their desired 
location as well as providing a platform for users (customers) who are looking for yard-work to be done on their 
property to find workers to do the desired jobs.

This system will allow customers to create job listings for their property. When a job is created it will then allow 
workers to accept the created job. After the worker completes the job payment will move from the customer to the worker
with a 10% service fee being taken out for the owner. The work can include but is not limited to lawn mowing, leaf
raking, snow shoveling, drain cleaning, hedge trimming and other such yard work.



## Team Organization 
Project Manager: Logan Hunt

Scrum Leader: Will change periodically so that each member gets a chance lead our scrum meetings.

Designers and Developers: Hailey Dennis, Jake Cogswell and James Field

## Software Development Process
The development will be broken up into five phases.  Each phase will be a little like a Sprint in an Agile method and a 
little like an iteration in a Spiral process.  Specifically, each phase will be like a Sprint, in that work to be done 
will be organized into small tasks, placed into a “backlog”, and prioritized.   Then, using on time-box scheduling, the 
team will decide which tasks the phase (Sprint) will address.  The team will use a Scrum Board to keep track of tasks in
the backlog, those that will be part of the current Sprint, those in progress, and those that are done.

Each phase will also be a little like an iteration in a Spiral process, in that each phase will include some risk 
analysis and that any development activity (requirements capture, analysis, design, implementation, etc.) can be done 
during any phase.  Early phases will focus on understanding (requirements capture and analysis) and subsequent phases 
will focus on design and implementation.  Each phase will include a retrospective.

| Phase | Iteration 
|:---|:---
| 1.    |  Phase 1 - Requirements Capture
| 2.    |  Phase 2 - Analysis, Architectural, UI, and DB Design
| 3.    |  Phase 3 - Implementation, and Unit Testing
| 4.    |  Phase 4 - More Implementation and Testing 



We will use Unified Modeling Language (UML) to document user goals, structural concepts, component interactions, and 
behaviors.



## Communication Policies, Procedures, and Tools
[Discord](https://discord.com) - This will be the number one tool used for communication outside of class. We will use dicord to discuss each
persons' assignment as well as make plans for when we need to meet in person to help better solve any issues we face.

In Class - Since We have class every Tuesday and Thursday, and we all sit next to each other we can use the time before 
and after class to have scrums where we talk about how the project is going and where we are running into issues and 
where we plan to be by the next class period.

GitHub - This will be where our project is stored so that we can all access it as well as it being used for our 
submissions', version control and data tracking. 


## Risk Analysis 
* Database Structure
  * Likelihood - Low
  * Severity - Very High
  * Consequences - Most other parts of this project require the database. If the database fails almost everything else
  will be unusable. 
  * Work-arounds - None, the database is needed

* Login
  * Likelihood - Low
  * Severity - Medium
  * Consequences - Inability or difficulty for users to log in will make it difficult for costumers to create jobs and 
  for workers to accept jobs as well as manage their preferences, location and payment information.
  * Work-arounds - Remove login feature
    * Difficulty - Easy
    * Impact - Users will have to type in their information every time they use our serves
    * Pros - Easier to implement
    * Cons - No saved preferences, accounts or locations. Have to re-enter information everytime you use the service. 
    Can't store money on app need to pay at time of service.

* UI
  * Likelihood - Low
  * Severity - High
  * Consequences - Inability for users to do anything if UI doesn't function
  * Work-arounds - None, a good UI is needed

* Spreading jobs around with beneficial treatment to higher rated workers
  * Likelihood - Low
  * Severity - Low
  * Consequences - Some workers may not get jobs if they are rated too low.
  * Work-arounds - Make it a simple queue with no priority based on ratings
    * Difficulty - Easy
    * Impact - Better rated workers won't get the better jobs
    * Pros - No need to worry about reviews, Easier to implement
    * Cons - Removes the positive impact to workers who get better reviews/removes desire to get better ratings.

* Payment
  * Likelihood - Low
  * Severity - High
  * Consequences - If payment is not correctly handled this could cause many angry customers and/or workers. May be 
  difficult refunding customers if workers withdraw money too quickly.
  * Work-arounds - Hold payment for a few days before sending it to the worker
    * Difficulty - Medium
    * Impact - Worker won't get access to their money immediately
    * Pros - Won't have to worry as much about refunds if there is a problem with the work because the money will remain 
    in limbo for few days before being paid to the worker. 
    * Cons - Will need an extra place to store the money. Need to make sure the money goes to the right worker after the 
    money is in limbo. 


## Configuration Management
See the [README.md](../README.md) in the Git repository.
