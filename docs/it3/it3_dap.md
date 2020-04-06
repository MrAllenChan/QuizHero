# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/it3_UML.png)

# Wireframe
> One (or a few) simple sketch of how the user interacts with the application. 
> This could be a sketch of your user interface. 
> You can draw it with hand and insert it here as an image.

- Instructor can upload a markdown file by clicking the upload button.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/upload1.jpg)
- Choosing a markdown file from local.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/upload2.jpg)
- Then, instructor can see the transferred slides and quiz page by clicking different modes.
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/upload3.jpg)

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

- As a student, I want to answer the quiz so that I can interact with the instructor during class.
- As a student, I want to view the slides uploaded by the instructor so that I can keep pace with the lesson.
- As an instructor, I want to collect students' answers and see the statistical data on my computer, so that I can know how students perform.

# Tasks
> A tentative list of the "to do" in order to successfully complete this iteration. 
> This list will change and it is good to keep it updated. 
> It does not need to be exhastive.

- Combine the slides html (converted from Markdown in iteration 1) and the interactive Quiz html (parsed from Markdown in iteration 2) to a complete functional student version (Combine the first two must-haves listed in iteration backlog above).
- Build backend **DAO, Model and API** to process quiz-related data stored in database, get relevant statistics, and sent back to front-end.
- Build front-end using React to receive quiz statistics sent from back-end.
- Create a page including some diagrams on front-end to visually display the quiz statistics. This is also the first step of the instructor version.

# Retrospective
> The retrospective is an opportunity for your team to inspect itself and create a plan for improvements to be enacted during the next iteration. Review what you had done in iteration 2; note things that you have and have not delivered, note the challenges you had, and reflect on how you shall proceed in the next iteration to do a better job.

### What went well?
- Successfully combined slides and quizzes into a single html page, students can now view slides as well as participating quizzes. The first two must-haves listed in this iteration are finished.
- Refined backend Model, DAO and API. Business logic is updated and now every action of uploading a file or answering a quiz question will initiate updates in the backend database. 
- Successfully delivered the feature of receiving quiz statistics from backend and visually displaying them with diagrams using React. Instructors can also refresh the diagram to keep track of the latest statistics.
- Delivered the alpha instructor version. Instructors can now view slides, quiz contents and quiz statistics. The third must-have in this iteration is finished.

### Challenges we met & Our solutions.
- In the beginning of this iteration we were a bit confused with using branches in our development. Later on we quickly adapted to this workflow and managed our branches well.
- At this stage we found some of our code implementations not much organized or object-oriented. We have discussed and made many changes and are keeping refractoring our code.
- Our web page styling and business logic (quiz and lecture format, button sizes and icons) right now is relatively rough, and we are refining them and will have a better design presented in the next iteration. Stay tuned!

### What we plan to improve during iteration 4.
- In addition to code refractoring and web page design, we plan to implement the login feature so that instructor-version file and student-version file will be separated. We will also deploy our application to heroku with database shifted to PostgreSQL.
