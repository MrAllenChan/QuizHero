# OO Design
> A UML class diagram reflecting the "model" for that iteration only.
> Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
> Upload the image and link it in here using this syntax.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it2/it2_UML.jpg)

# Wireframe
> One (or a few) simple sketch of how the user interacts with the application. 
> This could be a sketch of your user interface. 
> You can draw it with hand and insert it here as an image.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it2/it2_Wireframe.jpg)

# Iteration Backlog
> List the User Stories that you will implement in this iteration.

- As an instructor, I want to upload a Markdown file with quiz content, so that I can start a quiz during class.
- As a student, I want to answer the quiz so that I can interact with the instructor during class.

# Tasks
> A tentative list of the "to do" in order to successfully complete this iteration. 
> This list will change and it is good to keep it updated. 
> It does not need to be exhustive.

- Define a <quiz> tag as a format in the markdown file for instructor to create the quiz.
- Parse and extract quizzes content from markdown file.
- Convert the parsed quiz text into html using React.
- Enable communication between frontend and backend so that quiz information can be sent from front-end to back-end.
- Build backend **model** including application server to process quiz-related data.
- Create a database to store and modify the quiz-related data.


# Retrospective
> The retrospective is an opportunity for your team to inspect itself and create a plan for improvements to be enacted during the next iteration. Review what you had done in iteration 2; note things that you have and have not delivered, note the challenges you had, and reflect on how you shall proceed in the next iteration to do a better job.

### What went well?
- Successfully delivered the feature of uploading a Markdown file with quiz content and convert it to online quiz.
- Successfully delivered the feature of students answering quiz questions online. Additionally the quiz choices are shuffled every time a student click on the quiz link.
- Successfully delivered the feature of communicating between frontend and backend. Now quiz responses can be stored in the table created on backend side.

### Challenges we met & Our solutions.
- We discussed a lot on the syntax for creating quiz questions and choices. For now we land on using `>`, `* []` and `* [ x ]` to represent questions, choices and the correct choice. See `questions.md` for example question syntax.
- We met some difficulties when we tried to connect our frontend with backend. We solved it by adding static files built from React project to Javalin Resources folder.
- We discussed a lot on the database design and the format of the JSON object. We needed to decide on how to store quiz responses in backend. For now we limit the quiz questions to be multiple choices with four choices (A B C D) and the database table store the number of responses of A, B, C, D respectively.

