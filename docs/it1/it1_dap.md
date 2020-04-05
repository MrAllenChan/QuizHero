# OO Design
A UML class diagram reflecting the "model" for that iteration only.
Use a software to draw this (e.g. draw.io) and save the diagram as an image. 
Upload the image and link it in here using this syntax

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it1/UMLiter1.jpg)

# Wireframe
One (or a few) simple sketch of how the user interacts with the application. 
This could be a sketch of your user interface. 
You can draw it with hand and insert it here as an image.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it1/wireframe1.PNG)
![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/it1/it1_wireframe2.png)

# Iteration Backlog
List the User Stories that you will implement in this iteration.

- As an instructor, I want to upload a Markdown file so that it can be converted to a html containing my slides.
- As an instructor, I want to click and view the returned urls so that I can view my slides on the web browser.

# Tasks
A tentative list of the "to do" in order to successfully complete this iteration. 
This list will change and it is good to keep it updated. 
It does not need to be exhustive.

- Implement a simple front-end interface that can interact with the instructor and communicate with the back-end.
- Implement classes described in the UML diagram.
- Explore the possibility of making use of the Marpit modules to convert the markdown file.

# Retrospective
> The retrospective is an opportunity for your team to inspect itself and create a plan for improvements to be enacted during the next iteration. Review what you had done in iteration 1; note things that you have and have not delivered, note the challenges you had, and reflect on how you shall proceed in the next iteration to do a better job.

### What went well?
- Successfully delivered the feature of uploading a Markdown file and converting it to a html in presentation format.
- Successfully delivered the feature of returning the url that redirects to the presentation.
- Made the decision of using React and Node.js to implement frontend and web server.
- Next we will use Javalin or SpringBoot to develop our application server and connect it with the front-end.

### Challenges we met & Our solutions.
- We found it hard to combine our web server developed using Spark and our front-end developed using React. After consulting the Professor, we decided to use React + Node.js and abandon SparkJava.
- As iteration 1 went on, we found it hard to implement the tasks totally obeying the UML and frameworks we originally assumed; Just as software development is an evolving process, in future iterations we will leave some space in initial design and keep finalizing it as we push forward. 

