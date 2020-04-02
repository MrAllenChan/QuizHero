# QuizHero: a lightweight web app for creating presentations with quizzes from Markdown.

## What is it for?

QuizHero is a lightweight web app for creating presentations with quizzes from Markdown. Through this platform, instructors can create different versions of presentations, and students are able to view the slides and answer the quizzes online. Our application will collect students' answers of quizzes, store the answers, and display the statistical results to instructors, who will then have a good overview of students' performance.

## How is it built?

This project uses Marpit framework to convert Markdown and CSS themes to slide decks, and an original framework to convert Markdown content to quizzes. The front-end is based on React framework, the application server is developed using Javalin, and the database is based on SQLite.

## How to run our project

1. To run our QuizHero project, first simply download the project onto a local repository of your computer.
2. Use any popular IDE (IntelliJ IDEA recommended) to open the project **code/QuizHero_APP** and import as a **Gradle** project.
3. Make sure you have installed JDK 11. Also, set Project SDK as Java 11 (In IntelliJ, open File -> Project Structure -> Project Settings/Project, set Project SDK as 11). 
4. Under Run/Debug Configurations, set the classpath of module as "QuizHero.main". We also recommend that JRE 11 is used to run the project.
5. Try to build the project, if build successfully, run "**RunServer.main**" under src/main/java/api. 
6. If there is something wrong when building the project, in Gradle settings under Preferences, use Gradle from 'wrapper task' in Gradle build script (see below). Then build the project and run "RunServer.main" again, you should see the Javalin framework has begun to work now.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/configuration.jpg)

## After you run the project

Once you start running the project, you can go to http://localhost:7000/ (or the url displayed after "[main] INFO io.javalin.Javalin - Listening on") on your browser. You will see a start index page displayed on your browser with our logo "Quiz Hero" and an upload button.

Now, You can upload any Markdown file as long as the markdown format observes the rules we make. We provide a sample markdown file called **"demo.md"** that contains a demo slides with two sample quiz questions, and you can upload this file as a test. The markdown file will be converted to a slide-type html page. 

After successfully uploading the file, you can click the two button **Presenter mode** or **Stundent mode** to go to slides prepared for presenter or students, or click the **download button** to download the static html file. In **Presenter mode** or **Stundent mode**, every response to the quiz questions will be recorded into the database created on back-end side. You can visualize every detailed statistics on the result page of the Presenter mode. You may test it by open two tabs in your browser, the first one click Presenter mode and stay on the statistics page, the second one click the Student mode and do the quiz questions several times to simulate different students doing the quiz (or you can open several tabs or even browsers to do the quiz if you like, but it has to be on your machine, because we haven't deploy it yet). You can click the **Refersh** button on the statistics page from time to time to see the up-to-dated statistics.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/index.png)

## How to test our project

1. We recommend using Postman to test our back-end server. We have uploaded a Postman collection under directory **code/QuizHero_APP/src/main/resources/postman/QuizHero.postman_collection.json**, and you can import this json file into your Postman application to test if the back-end server functions well as expected.

![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/PostmanTest.jpg)
