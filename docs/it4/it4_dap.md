# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/it4_UML.png)

# Wireframe
> One (or a few) simple sketch of how the user interacts with the application. 
> This could be a sketch of your user interface. 
> You can draw it with hand and insert it here as an image.

## Homepage

- Users can choose user mode first by clicking "I am a presenter" or "I am a student".

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/userChoicePage.png)

## Instructor Page

- Instructors can sign up to create an account.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/signup.png)

- Instructors can log in by entering username and password.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/login.png)

- Instructors can upload a markdown file after login. Then, instructor can see the transferred slides and quiz page by clicking different modes.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/upload.png)

<!-- - Instructors can view and download former markdown file in the file history. -->

<!-- ![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/historypage.png) -->

- Both the student mode and presentation mode can show the slides, and users can join the quiz by clicking "start quiz" button in slides.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/pre1.png)
<!-- ![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre2.png) -->

- Instructors can answer or skip(clicking "skip" button) the questions and view the statistical data of each question.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/quiz-presentation.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/presentation-statistic.png)

---

## Student page

- Students can view the sildes by entering the file code instructor shared with them in the search box.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/urlPage.png)

- Students can choose answer for the quiz questions, but they cannot see the result data.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/quiz-stu.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/stu-result.png)



# Iteration Backlog
> List the User Stories that you will implement in this iteration.
- As a student, I want to view the slides uploaded by the instructor so that I can keep pace with the lesson.
- As an instructor, I want to have a presenter mode to see all my notes and quizzes, so that I can teach a course and have a better overview of my teaching content.
- As an instructor, I want to log in to the website, so that I can prevent others from accessing my files.


# Tasks
> A tentative list of the "to do" in order to successfully complete this iteration. 
> This list will change and it is good to keep it updated. 
> It does not need to be exhastive.
- Convert current SQLite database to PostgreSQL, which is officially supported by heroku.
- Develop separate student page for students to access the slides and quizzes from open Internet using secrect code provided by their instructors. 
- Deploy our alpha release on heroku.
- Add login interface on front-end side using react framework.
- Implement communication between front-end and back-end regarding login information.
- Refine API and DAOs on back-end for processing and storing login information.
- Design and refine Model, API and DAOs for managing user-file information in database on back-end.
- Implement the function of uploading files on front-end and receiving and storing files on back-end server.
- Refactor code to make it more object-oriented.


# Retrospective
> The retrospective is an opportunity for your team to inspect itself and create a plan for improvements to be enacted during the next iteration. Review what you had done in iteration 2; note things that you have and have not delivered, note the challenges you had, and reflect on how you shall proceed in the next iteration to do a better job.

### What went well?
- Successfully switch to using postgreSQL and deploy on Heroku. The app is online now!
- We change the overl style of the app to a cleaner/modern design.
- Successfully deliver the feature of insturctor login. Components on frontend-side and DAOs on backend-side are added to enable the user registration and login system.
- Successfully deliver the feature of uploading file on the deployed version.
- We generalize the format of Markdown file that QuizHero can work on: instructor now can insert the quizzes in any part of the Markdown file.
- The portal for instructor and student are separated: insturctors need to login to upload and see their history files; students need a code/url (for now we use fileId) to access the slides.
- Frontend code are refractored now to make it clean, organized and object oriented.
- Postman and unit tests are added on the backend to validate implemented functions.

### Challenges we met & Our solutions.
- We met some difficulties in the process of changing to postgreSQL and deploying on Heroku. We found solutions online and now it works well.
- Because the Heroku file system is ephemeral, we cannot upload markdown files and save them in the file systemn of the server. Hence, we have to completely abandon the previous methods we wrote to store files locally, and finally decided to store the content of .md files as bytearray (bytea) in PostgreSQL database. In this way we are able to store files in a persistent way and fetch them as byte stream, and also avoid the hassle of connecting to AWS service from Heroku. If future features of the app require the function of file management system, we can always switch to using AWS.

### What we plan to improve during iteration 5.
- Since we have already deployed our application on Heroku, we are ready for a beta release after we add some final features, continue refactoring our code as well as perfecting web page styling.
- We plan to add the following feature: 
  1. instructors can easily share a link or a code for their students to access the student version of the slides; 
  2. students cannot start the quiz until instructors release permission on the instructor version of the slides.
- Write more comments on methods and classes.
- Prepare for presentation and code review.
