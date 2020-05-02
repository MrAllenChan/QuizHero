# QuizHero: a Lightweight Web Application for Creating Interactive Slides with Quizzes from Markdown.

## Table of Contents
- [Have Fun with QuizHero.](#have-fun-with-quizhero)
- [What is QuizHero for?](#what-is-quizhero-for)
- [How to use QuizHero?](#how-to-use-quizhero)
  * [Instructor Mode](#instructor-mode)
      * [1. Upload and Sharing](#1-upload-and-sharing)
      * [2. View Slides](#2-view-slides)
      * [3. Start Quiz and View Statistics](#3-start-quiz-and-view-statistics)
      * [4. View History and Delete Files](#4-view-history-and-delete-files)
      * [5. Presenter Mode with Notes & Second Audience Window](#5-presenter-mode-with-notes--second-audience-window)
  * [Student Mode](#student-mode)
      * [1. Input Code and View Slides](#1-input-shared-code-and-view-slides)
      * [2. Take Quiz and Back to Slides](#2-take-quiz-and-back-to-slides)
- [Markdown Instructions](#markdown-instructions)
- [Run QuizHero Locally.](#run-quizhero-locally)
- [Test QuizHero](#test-quizhero)
- [How is QuizHero Built?](#how-is-quizhero-built)
- [Acknowledgements](#acknowledgements)

## Have Fun with QuizHero.
Our QuizHero app is now deployed on Heroku and can be run in Google Chrome. [Jump here to have fun with QuizHero!](https://quiz-hero.herokuapp.com/) You can also run our app at localhost. Detailed instructions will be given below.

<p align = "center">
  <img width="100%" src="https://i.loli.net/2020/04/29/jkoPVwNA1DH5Yix.jpg">
</p>

## What is QuizHero for?
QuizHero is a lightweight web application that allows you to **create your presentation slides from Markdown**. You simply need to write your own markdown file, with slides you want to present and quizzes you want to interact with your students(audience), and **let QuizHero handle everything else**. 

Through this platform, instructors can create different presentations by uploading different markdown files, and students are able to view the slides and answer the quizzes online. QuizHero will collect students' answers of quizzes, store the answers, analyze and display the **statistical results** to instructors, who will then have a good overview of students' performance. 

QuizHero has a user-friendly **login** interface, and allows every registered instructor to **view their history**, including every presentations they created and all the statistical data.

There are even **more features** waiting for you to explore! For example, the quiz contents in a converted presentation can be **protected** by the instructor, who will have the power to make the quizzes inaccessible until he/she releases them. Also, the statistical data can be **refreshed** in real time, and instructors will be able to keep track of the latest statistics as well of students' performance. 

Just enjoy and have fun with QuizHero!

## How to use QuizHero?
To begin with, you will see a welcome page displayed on your browser with our logo "QuizHero" as well as two buttons you can choose: **`I'm a Presenter`** and **`I'm a Student`** as shown in the beginning of this page.

### Instructor Mode
If you choose "I'm a presenter", you will be guided to the **Login** interface, or you can **register** as a new instructor.

> Your email must be unique and the format must obey standard format, and your password must be at least 6 character long. You will be alerted if your email is already registered.

#### 1. Upload and Sharing
See the GIF below! After logging into QuizHero successfully, You can upload any Markdown file as long as the markdown format obeys the rules we make! You can click **`Start sharing`** and the unique file ID will be copied into your clipboard. You can share this id with your audience before presentation. They will be able to view the **student version** slides and quizzes using this unique ID. 

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290252ins_upload_share.gif' alt='202004290252ins_upload_share'/>

> We provide a sample markdown file called **"template.md"** that contains some demo slides with 4 sample quiz questions, and you can upload this file as a test. The markdown file will be converted to a slide-type html page that you can interact with! 

If you want to stop sharing the file, simply click **`Stop sharing`** and the previous ID will expire until your start sharing the file again.

#### 2. View Slides
Presenters can view all the slides and quizzes that have been converted from the original Markdown file, and can also click  **`Download HTML`** to download the static HTML file. 

Now let's see what's inside the "presenter mode" slides! All the raw markdown content have been converted to neat and beautiful slides, as shown below:

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290230ins_view_slides.gif' alt='202004290230ins_view_slides'/>


#### 3. Start Quiz and View Statistics
Presenters can click **`start quiz`** button to **release the permission** of quiz. So, students won't be able to take quiz without permission. 

Presenters can choose to take or **`skip`** the quiz, and do NOT need to worry about messing up with the statistics as the result won't be recorded and sent into the database.

The last page shows the statistics of all the quizzes in this file. The green/red bar represent the number of students that choose the correct/wrong answer, and the blue line shows the correct percentage of each quiz question.

Presenters can click the **Refresh** button on the statistics page to see the up-to-date statistics.

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290301ins_quiz_stat.gif' alt='202004290301ins_quiz_stat'/>

#### 4. View History and Delete Files

You can view all of the files you uploaded before by clicking **`History`** button in the top left corner.

Still, for each file, you have the options to enter **`Presenter Mode`**, **`Start Sharing`**, or **`Stop Sharing`**. But now you can **`Delete`** them as well!

**Bonus:** Click the filename to directly download the **original markdown file**. No need to worry about losing your files!

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004301642ins_history_delete.gif' alt='202004301642ins_history_delete'/>

#### 5. Presenter Mode with Notes & Second Audience Window

Press **`Option + P`** to open presenter mode. You will be able to open a second audience window as well as viewing your private notes to better support your presentation. Credits to Spectacle!

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004291524presenter_mode.gif' alt='202004291524presenter_mode'/>

---

### Student Mode
So you're a student now! You may choose **`I'm a Student`** from the welcome page, and will be directed to the student page with a search bar.

#### 1. Input Code and View Slides
Suppose you have received the **shared file code** from your instructor, now you can input the shared code to fetch the presentation slides. 

If the code matches and the corresponding file is accessible, you will be given the option **`Go to Presentation`**. You can now start viewing interactive **Student mode** slides with quizzes inside.

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004301644stu_input_view.gif' alt='202004301644stu_input_view'/>

> We do not require students to login to use our service for simplicity, and the presenter should be careful about whom the secret code is shared with. However, as mentioned above, we have developed the feature that allows presenters to **protect their slides and quizzes** by enabling or disabling the shared code as well as the quizzes inside!

#### 2. Take Quiz and Back to Slides

Click **`Start Quiz`** and interact with your instructor! After finishing the quiz, you can go back and continue viewing the remaining slides.

<img src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004301645stu_quiz_back_slides.gif' alt='202004301645stu_quiz_back_slides'/>

## Markdown Instructions
Want to write your own presentation slides? No problem!

First, you are encouraged to take a look at **"template.md"** to have an idea of the rules. The rules simply follow the standard Markdown syntax and is quite easy to understand!

Now, here are some core marks you can grasp in 10 seconds:
- **`---`** is used as a slide delimiter.
- **`Notes:`** Embed private notes in presenter mode. 
- **`> Question:`** marks question topic
- **`* [ ]`**  marks wrong option (with a space inside)
- **`* [x]`**  marks correct option
 
```markdown
# QuizHero Demonstration

- This is a **demo**

Notes: this is my private notes. The student can not see that.

---

# Start Presenter Mode!

- Press **`Option + P`** to open presenter mode. Open a second audience window & view your private notes to better support your presentation.

Notes: Presenter mode is so cool.

---
```

```markdown
> Question: Which framework do you use to develop your backend server?
* [ ] A. SpringBoot
* [x] B. Javalin
* [ ] C. SparkJava
* [ ] D. Tomcat
```

- You can write HTML tag inside the markdown to insert images and adjust the position or size as you like.

```html
<p align = "center">
<img width = "50%" src='www.example.com/image.jpg'/>
</p>
```

## Run QuizHero Locally.

1. To run our QuizHero project, first simply download the project onto a local repository of your computer.
2. Use any popular IDE (IntelliJ IDEA recommended) to open the project **code/QuizHero_APP** and import as a **Gradle** project.
3. Make sure you have installed JDK 11. Also, set Project SDK as Java 11 (In IntelliJ, open `File` -> `Project Structure` -> `Project Settings/Project`, set Project SDK as 11). 
4. Under Run/Debug Configurations, set the classpath of module as "`QuizHero.main`". We also recommend that JRE 11 is used to run the project.
5. Try to build the project, if build successfully, run "`RunServer.main`" under src/main/java/api. 
6. If there is something wrong when building the project, in Gradle settings under `Preferences`, use Gradle from `'wrapper' task in Gradle build script` (see below). Then build the project and run "`RunServer.main`" again, you should see the Javalin framework has begun to work now.

<p align = "center">
    <img width = "60%" src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004301343configuration.jpg' alt='202004301343configuration'/>
</p>

## Test QuizHero

1. You can test our project as a whole by opening two tabs on your browser. On the first tab, enter Presenter mode and stay on the result page that displays statistics. On the second one, enter Student mode and answer the quiz questions several times to simulate the situation that a group of students are doing the same quizzes simultaneously (or you can open several tabs or even browsers to do the quiz if you like). 

2. We recommend using Postman to test our back-end API server. We have uploaded two Postman collections (for localhost and for Heroku) under directory **code/QuizHero_APP/src/main/resources/postman**, and you can import both json files into your Postman application to test if the back-end server functions well as expected.

3. We have also written unit tests for Model, Dao and ApiServer. You can run those tests under directory **code/QuizHero_APP/src/test**.

<p align = "center">
  <img width = "70%" src="https://i.loli.net/2020/04/29/yh2OQlnk8ITmAcZ.jpg">
</p>

## How is QuizHero Built?

- [React](https://github.com/facebook/react/): The front-end is based on React framework
- [Ant Design](https://ant.design): An enterprise-class UI design language and React UI library
- [Spectacle](https://github.com/FormidableLabs/spectacle): A React.js based library for converting raw markdown content to dynamic slide decks.
- [Javalin](https://javalin.io/): Application server for creating REST API
- [PostgreSQL](https://www.postgresql.org/): Relational Database Management System (RDBMS)
- [sql2o](https://www.sql2o.org): A Java library for executing SQL statements
- [Gradle](https://gradle.org/): Automation build system
- [Postman](https://www.postman.com/): Test API server
- [JUnit](https://junit.org/junit5/): Unit testing framework
- [Unirest](http://kong.github.io/unirest-java/): A lightweight HTTP client library for testing APIs in Java

## Acknowledgements

- [Spectacle](https://github.com/FormidableLabs/spectacle)
