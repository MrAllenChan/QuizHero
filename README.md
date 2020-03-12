# QuizHero: a lightweight web app for creating  presentations with quizzes from Markdown.

Users can create different versions of presentations for instructors and students and have access to quiz result statistics after student submission. It uses Marpit framework to convert Markdown and CSS themes to slide decks and an original framework to convert Markdown content to quizzes. 

## How to run our project

1. To run our QuizHero project, first simply download the project into a local repository of your computer.
2. Use any popular IDE (IntelliJ IDEA recommended) to open the project code/QuizHero_APP and import as a **Gradle** project.
3. Make sure you have installed JDK 11. Also, set Project SDK as Java 11 (In IntelliJ, open File -> Project Structure -> Project Settings/Project, set Project SDK as 11). 
4. Under Run/Debug Configurations, set the classpath of module as "QuizHero.main". We also recommend that JRE 11 is used to run the project.
5. Try to build the project, if build successfully, run "RunServer.main" under src/main/java/api. 
6. If there is something wrong when building the project, in Gradle settings under Preferences, use Gradle from 'wrapper task' in Gradle build script (see below). Then build the project and run "RunServer.main" again, you should see the Javalin framework is started.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/configuration.jpg)

## Project Instrctions

The front-end was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). We use an industrial React UI library `antd`, which contains a set of high quality components to develop our front-end. Marpit is credited for helping us creating slide deck from Markdown. 

Once you start running the project, you can go to http://localhost:7000/ (or the url displayed after "[main] INFO io.javalin.Javalin - Listening on") on your browser. You will have a start index page displayed on your browser with our logo "Quiz Hero" and an upload button. 

Now, You can upload any Markdown file as long as the markdown format observes the rules we make. We provide a sample markdown file called "**questions.md**" that contains quiz questions, and you can upload this file as a test. The markdown file will be convert to a slide-type html page. After successfully uploading the file, you can click the name of the file to start a quiz, or click the download button and open the downloaded html file. Every reponse to quiz questions will be recorded in the table created on backend side. You can see this communication in the run window.
