# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it5/it5_UML.png)

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

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it5/upload_it5.png)

- Instructors can view and download former markdown file in the file history.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/historypage.png)

- Both the student mode and presentation mode can show the slides, and users can join the quiz by clicking "start quiz" button in slides.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/pre1.png)
<!-- ![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it3/pre2.png) -->

- Instructors can answer or skip(clicking "skip" button) the questions and view the statistical data of each question.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/quiz-presentation.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/presentation-statistic.png)

---

## Student page

- Students can view the slides by entering the file code instructor shared with them in the search box, then students can view the presentation slides and download the file.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it5/studentShare.png)

- Students can choose answer for the quiz questions, but they cannot see the result data.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/quiz-stu.png)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it4/stu-result.png)



# Iteration Backlog
> List the User Stories that you will implement in this iteration.
- As an instructor, I want to have a page to view all my history files so that I can view the files or download them.
- As an instructor, I want to control the permission of opening the quiz inside the slides, so that I can prompt the students to answer the quiz at the certain time.


# Tasks
> A tentative list of the "to do" in order to successfully complete this iteration. This list will change and it is good to keep it updated. It does not need to be exhastive.

- Create a dynamic history page to render all the files belong to the logged-in instructor.
- Implement the view and download functionalities of each file to allow these actions.
- Design and refine Model, API and DAOs for managing files in database on back-end.
- Create control button on presenter side to toggle the permission of opening the quiz.
- Refine API and DAOs on back-end for quiz accessing control.
- Refactor code to make it more object-oriented.

# Tasks
> List of tasks revisited after Thursday meeting

- Fix user login and log out, error msg, test on heroku
- File/quiz permission
- User history page
- File download function
- "return from presentation" button: new tab or navitation bar
- md template on frontpage, an instruction on markdown syntax
- fix unit test
- update README
- draft presentation (first to present on Tuesday, pick 4 user stories)


# Final Retrospective
> It is similar to iteration retrospective but you look back over the entire five iterations. In particular, revisit your original project proposal, note on what has changes, what features you have/have not delivered. Briefly note the challenges you had. And, finally, reflect on how you would do it again if you could go back in time and start at iteration 1. You don't need a time machine to achieve this. The next software project you develop, you will start at iteration 1, and I am sure it will be a great one.

- Please redirect to docs/Final_Retrospective.md to view our [final retrospective.](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/Final_Retrospective.md)

