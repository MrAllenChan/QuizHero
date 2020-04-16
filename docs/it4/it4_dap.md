# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/it4_UML.png)

# Wireframe
> One (or a few) simple sketch of how the user interacts with the application. 
> This could be a sketch of your user interface. 
> You can draw it with hand and insert it here as an image.

- Users can choose user mode first by clicking "I am a presenter" or "I am a student".

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/userChoicePage.png)

- Students can be access to the file by inputing the url instructor shared to them in the search box.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/urlPage.png)

- Instructor can sign up to create an account.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/signup.png)

- Instructor can log in by entering username and password.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/login.png)

- Instructor can upload a markdown file after login. Then, instructor can see the transferred slides and quiz page by clicking different modes.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/upload.png)

- Instructor can view and download former markdown file in the file history.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/historypage.png)

- Both the student mode and presentation mode can show the slides, and users can join the quiz by clicking "start quiz" button in slides.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre1.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre2.png)

- Students can choose answer for the quiz questions, but they cannot see the result data.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/quiz-stu.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/stu-result.png)

- Instructors can answer or skip(clicking "skip" button) the questions and view the statistical data of each question.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/quiz-presentation.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/presentation-statistic.png)

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




<!--# Retrospective

### What went well?

### Challenges we met & Our solutions.-->
