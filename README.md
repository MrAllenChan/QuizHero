# QuizHero: a Lightweight Web Application for Creating Interactive Slides with Quizzes from Markdown.

## Have fun with QuizHero.

Our QuizHero app is now deployed on Heroku and can be run in Google Chrome. [Jump here to have fun with QuizHero!](https://quiz-hero.herokuapp.com/) You can also run our app at localhost. Detailed instructions will be given below.

![jkoPVwNA1DH5Yix](https://i.loli.net/2020/04/29/jkoPVwNA1DH5Yix.jpg)


## What is QuizHero for?

QuizHero is a lightweight web application that allows you to create your presentation slides from Markdown. You simply need to write your own markdown file, with slides you want to talk and quizzes you want to interact with your students, and let QuizHero handle everything else. 

Through this platform, instructors can create different presentations by uploading different markdown files, and students are able to view the slides and answer the quizzes online. QuizHero will collect students' answers of quizzes, store the answers, analyze and display the **statistical results** to instructors, who will then have a good overview of students' performance. QuizHero has a user-friendly login interface, and allows **every registered instructor** to view their history, including every presentations they created and all the statistical data.

There are even **more features** waiting for you to explore! For example, the quiz contents in a converted presentation can be **protected** by the instructor, who will have the right to make the quizzes inaccessible until he/she releases them. Also, the statistical data can be refreshed in real time, and instructors will be able to keep track of the latest statistics as well of students' performance. Just enjoy and have fun with QuizHero!

## How to use QuizHero?

To begin with, you will see a welcome page displayed on your browser with our logo "QuizHero" as well as two buttons you can choose: **`I'm a Presenter`** and **`I'm a Student`** as shown in the beginning of this page.

---

### Instructor mode
If you choose "I'm a presenter", you will be guided to the **Login** interface, or you can **register** as a new instructor.

> Your email must be unique and the format must obey standard format, and your password must be at least 6 character long. You will be alerted if your email is already registered.

##### Upload and Sharing
See the GIF below! After logging into QuizHero successfully, You can upload any Markdown file as long as the markdown format obeys the rules we make! You can click **`Start sharing`** and the unique file ID will be copied into your clipboard. You can share this id with your audience before presentation. They will be able to view the **student version** slides and quizzes using this unique ID. 

<!--![lCJu4svPLrxnXyp](https://i.loli.net/2020/04/29/lCJu4svPLrxnXyp.gif)-->
<p align="center">
  <img width="460" height="300" src="https://i.loli.net/2020/04/29/lCJu4svPLrxnXyp.gif">
</p>

> We provide a sample markdown file called **"template.md"** that contains some demo slides with 4 sample quiz questions, and you can upload this file as a test. The markdown file will be converted to a slide-type html page that you can interact with! 

If you want to stop sharing the file, simply click **`Stop sharing`** and the previous ID will expire until your start sharing the file again.

##### View slides
Presenters can view all the slides and quizzes that have been converted from the original Markdown file, and can also click  **`Download HTML`** to download the static HTML file. 

Now let's see what's inside the "presenter mode" slides! All the raw markdown content have been converted to neat and beautiful slides, as shown below:

![2rlJE6j1GPuvoby](https://i.loli.net/2020/04/29/2rlJE6j1GPuvoby.gif)


##### Start Quiz and View Statistics
Presenters can click **`start quiz`** button to **release the permission** of quiz. So, students won't be able to take quiz without permission. 

Presenters can choose to take or **`skip`** the quiz, and do NOT need to worry about messing up with the statistics as the result won't be recorded and sent into the database.

The last page shows the statistics of all the quizzes in this file. The green/red bar represent the number of students that choose the correct/wrong answer, and the blue line shows the correct percentage of each quiz question.

Presenters can click the **Refresh** button on the statistics page to see the up-to-date statistics.

![iztVmjKvS3DcqZW](https://i.loli.net/2020/04/29/iztVmjKvS3DcqZW.gif)

<!--![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/upload.png)-->

##### View History and Delete Files

##### Presenter Mode with Notes & Second Audience Window

---

### Student mode

So you're a student now! You may choose **`I'm a Student`** from the welcome page, and will be directed to the student page with a search bar. Suppose you have received the shared file code from your instructor, now you can input the shared code to fetch the presentation slides. 

![yFN8b3YRHw4hpoI](https://i.loli.net/2020/04/29/yFN8b3YRHw4hpoI.gif)

If the code matches and the corresponding file is accessible, students will be given two options **`Go to Presentation`** or **`Download file`**. They can choose to view interactive **Student mode** slides with quizzes inside or download the static html file.

> We do not require students to login to use our service for simplicity, and the presenter should be careful about whom the secret code is shared with. However, as mentioned above, we have developed the feature that allows presenters to **protect their slides and quizzes** by enabling or disabling the shared code as well as the quizzes inside!

<!--![](https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/studentpage.png)-->

<!--Now you may test the quiz feature by going the quiz page in **Presenter mode** and **Student mode** from two tabs or two computers. Every response to a quiz question will be transmitted to the back-end and recorded into the database. The detailed statistics is visualized on the **result page** of the **Presenter mode**-->

## Markdown instructions
Want to write your own presentation slides? No problem!

First, you are encouraged to take a look at **"template.md"** to have an idea of the rules. The rules simply follow the standard Markdown syntax and is quite easy to understand!

## Run QuizHero locally.

1. To run our QuizHero project, first simply download the project onto a local repository of your computer.
2. Use any popular IDE (IntelliJ IDEA recommended) to open the project **code/QuizHero_APP** and import as a **Gradle** project.
3. Make sure you have installed JDK 11. Also, set Project SDK as Java 11 (In IntelliJ, open File -> Project Structure -> Project Settings/Project, set Project SDK as 11). 
4. Under Run/Debug Configurations, set the classpath of module as "QuizHero.main". We also recommend that JRE 11 is used to run the project.
5. Try to build the project, if build successfully, run "**RunServer.main**" under src/main/java/api. 
6. If there is something wrong when building the project, in Gradle settings under Preferences, use Gradle from 'wrapper task' in Gradle build script (see below). Then build the project and run "RunServer.main" again, you should see the Javalin framework has begun to work now.

<!--<img src="https://github.com/jhu-oose/2020-spring-group-QuizHero/blob/master/docs/configuration.jpg" width="750" height="380" />
-->

## Test QuizHero

1. You can test our project as a whole by opening two tabs on your browser. On the first tab, enter Presenter mode and stay on the result page that displays statistics. On the second one, enter Student mode and answer the quiz questions several times to simulate the situation that a group of students are doing the same quizzes simultaneously (or you can open several tabs or even browsers to do the quiz if you like). 

2. We recommend using Postman to test our back-end API server. We have uploaded two Postman collections (for localhost and for Heroku) under directory **code/QuizHero_APP/src/main/resources/postman**, and you can import both json files into your Postman application to test if the back-end server functions well as expected.

3. We have also written unit tests for Model, Dao and ApiServer. You can run those tests under directory **code/QuizHero_APP/src/test**.

![yh2OQlnk8ITmAcZ-w480](https://i.loli.net/2020/04/29/yh2OQlnk8ITmAcZ.jpg)

## How is QuizHero built?

The front-end is based on React framework, with the help of Spectacle to present dynamic slide decks converted from raw Markdown file. The development of back-end server involves a lot of tools and frameworks. The application server is developed using Javalin, and we use PostgreSQL as our database management system. Gradle is used as the automation build system, and we use Postman and JUnit framework to test the server.

## Credit
