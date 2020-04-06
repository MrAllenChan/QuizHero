# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/it3_UML.png)

# Wireframe
> One (or a few) simple sketch of how the user interacts with the application. 
> This could be a sketch of your user interface. 
> You can draw it with hand and insert it here as an image.

- Instructor can sign up to create an account.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/signup.png)

- Instructor can log in by entering username and password.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/login.png)

- Instructor can upload a markdown file after login. Then, instructor can see the transferred slides and quiz page by clicking different modes.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/upload.png)

- Instrucor can view and download former markdown file in the file history.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/history.png)

- Both the student mode and presentation mode can show the slides, and users can join the quiz by clicking "start quiz" button in slides.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre1.jpg)

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre2.jpg)

- Students can choose answer for the quiz questions, but they cannot see the result data.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/quiz-stu.jpg)

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/stu-result.jpg)

- Instructors can answer or skip(clicking "skip" button) the questions and view the statistical data of each question.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/quiz-presentation.jpg)

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/presentation-statistic.jpg)

# Iteration Backlog
> List the User Stories that you will implement in this iteration.
- As a student, I want to view the slides uploaded by the instructer so that I can keep pace with the lesson.
- As an instructor, I want to have a presenter mode to see all my notes and quizzes, so that I can teach a course and have a better overview of my teaching content.
- As an instructor, I want to log in to the website, so that I can review my presentation history.


# Tasks
> A tentative list of the "to do" in order to successfully complete this iteration. 
> This list will change and it is good to keep it updated. 
> It does not need to be exhastive.
- Convert current sqLite database settings to PostgreSQL, which is officially supported by heroku.
- Deploy our alpha release on heroku.
- Refactor code to make it more object-oriented.
- Make decisions on web page styling.
- Add login iterface on frontend-side using react framework.
- Design and add DAOs for login information and file management in database on backend-side.
- Deploy alpha (beta?) release on heroku.


<!--# Retrospective

### What went well?

### Challenges we met & Our solutions.-->
