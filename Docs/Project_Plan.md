# Project Name Here

## Project Overview
This project aims to provide a platform for people who perform yard-work (workers) to find jobs in their desired location as well 
as providing a platform for users (customers) who are looking for yard-work to be done on their property to find workers to do the
desired jobs.

This system will allow customers to place jobs for their property and allow workers to accept these jobs with a 10% fee
being taken out of the customers' payment. 


## Team Organization 
Project Manager: Logan Hunt

Designers and Developers: Hailey Dennis, Jake Cogswell nad James Field

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

 Phase | Iteration 
:---|:---
 1.    |  Phase 1 - Requirements Capture
 2.    |  Phase 2 - Analysis, Architectural, UI, and DB Design
 3.    |  Phase 3 - Implementation, and Unit Testing
 4.    |  Phase 4 - More Implementation and Testing 



We will use Unified Modeling Language (UML) to document user goals, structural concepts, component interactions, and 
behaviors.



## Communication Policies, Procedures, and Tools
[Discord](https://discord.com) - This will be the number one tool used for communication outside of class. We will use dicord to discuss each
persons' assignment as well as make plans for when we need to meet in person to help better solve any issues we face.

In Class - Since We have class every Tuesday and Thursday, and we all sit next to each other we can use the time before 
and after class to have scrums where we talk about how the project is going and where we are running into issues and 
where we plan to be by the next class period.

GitHub - This will be where our project is stored so that we can all access it as well as it beiong used for our 
submissions', version control and data tracking. 

## Risk Analysis 
* Database Structure
  * Likelihood - Low
  * Severity - Very High
  * Consequences - Most other parts of this project require the databasse. If the database fails almost everything else
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

* Spread jobs around
  * Likelihood - Low
  * Severity - Low
  * Consequences - Some users may get jobs more often then others
  * Work-arounds -

* Payment
  * Likelihood - Low
  * Severity - High
  * Consequences - If payment is not correctly handles this could cause many angry customers and/or workers.
  * Work-arounds -


## Configuration Management
See the [README.md](https://github.com/Simponic/cs3450-team-one/blob/main/README.md) in the Git repository.
