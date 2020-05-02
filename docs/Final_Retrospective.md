# Final Retrospective
> It is similar to iteration retrospective but you look back over the entire five iterations. In particular, revisit your original project proposal, note on what has changes, what features you have/have not delivered. Briefly note the challenges you had. And, finally, reflect on how you would do it again if you could go back in time and start at iteration 1. You don't need a time machine to achieve this. The next software project you develop, you will start at iteration 1, and I am sure it will be a great one.

### Revisiting Original Project Proposal

#### 1. What we have delivered
We have delivered all of the must-have features and the first two nice-to-have features we set in the project proposal.
* As an instructor, I want to upload a markdown file containing the quiz questions and lecture slides, so that I can start a quiz during the class.
* As a student, I want to answer the quiz so that I can interact with the instructor during class.
* As a student, I want to view the slides uploaded by the instructer so that I can keep pace with the lesson.
* As an instructor, I want to collect students' answers and see relevant statistical data on my computer, so that I can know how students perform.
* As an instructor, I want to have a presenter mode to see all my slides, quizzes and notes, so that I can teach a course and have a better overview of my teaching content.
* As an instructor, I want to log in to the website, so that I can have my personal record.
* As an instructor, I want to review my presentation history, so that I can go through what I have taught.
* As an instructor, I want to control the permission of starting quiz inside the slides, so that I can prompt my students to answer the quiz at the right time.
* As an instructor, I want to control the permission of opening the files I upload, so that I can prompt my students to view the slides at the right time.

#### 2. What we have not delivered
There are 2 nice-to-have features we have not delivered or decided not to deliver at last.
* As a student, I want to download the presentation onto my own computer, so that I can review it after class.
    * We delivered this feature previously, but due to the reason that students will be able to download the file and see the quizzes and answers in advance, we finally decided to temporarily disable this feature. We will probably allow instructors to control the permission of downloading files in the future.
* As an instructor, I want to set a timer module, so students need to complete the quiz or discussion within the time limit. 
    * This feature is more complicated than we initially anticipated. Also, we have already delivered so many essential features within such a limited time, and we decide to focus on perfecting what we have achieved.

#### 3. What have changed
Recall the original proposal, we made the following changes:

* The original Nice-to-have feature "*As an instructor, I want to set a limitation of the slides, so that students cannot view the slides I haven’t presented*." was broke down to 2 parts, so that instructors can have better control of the entire presentation flow.
   * As an instructor, I want to control the permission of opening the files I upload, so that I can prompt my students to view the slides at the right time.
   * As an instructor, I want to control the permission of starting quiz inside the slides, so that I can prompt my students to answer the quiz at the right time.
* We moved the login feature from nice-to-have to must-have requirement, as we realized that it is one of the essential functions of our application that allows every instructor to manage their own files.

### Recall the Whole Development Process 

When we look back at the beginning of this project, we have to admit that we were quite confused at that time: we were not sure what frameworks we should finally choose; how the Model, DAOs and database should be designed; what plugins we could use to import to our code and convert the markdown file successfully; how we could parse and extract quiz contents from markdown file; we even ran into trouble for the combination of front-end and back-end code as well as the communications between the two systems in the beginning.

However, "The beginning is always the hardest". As we conquered those problems one by one, we gradually had a feeling that the toughest time had past and we were moving on a right track of development. Also, we spent a lot of time discussing the design of the application and built a relatively robust architecture of the system, based on which we developed new features more and more smoothly. Sometimes, we had an inner voice saying that "Yes it should be like this". We were bursting with passion, building the application with motivation.

Here we list some **major challenges** we met, and how we finally overcame them.

1. **Connecting frontend with backend**. We solved it by adding static build files built from React project to Javalin resources/public folder. Later when we deploy the application, we push the entire project including build files of front-end to Heroku.
2. **Designing quiz marks and parsing algorithm** is one of the biggest challenges during the whole process. We solved this problem by first dividing slides and quizzes into two parts. Then we replaced quizzes with a certain symbol so that we can add quizzes in the correct place of the slides. Finally, we parsed each quiz question according to some special marks, so that we could obtain question topic, options and the correct answer for each question.
3. **Developing separate student page** for students to access the presentation from open Internet is another challenge. We developed this feature by storing the file in the server and returning a unique file code to the instructor. Instructors can share the code with students, who will be able to use the code to fetch that file from database and render a student version presentation.
4. **How to store uploaded files**. Previously, we wrote a series of methods to store files locally and the logic works all well when we tested the server at localhost. However, during deployment process we found that the Heroku file system is ephemeral, and we cannot upload markdown files and save them in the file system of the server. Hence, we have to completely abandon the previous logic. Finally, we decided to store the content of markdown files as byte stream in the PostgreSQL database, in which way we were able to store files in a persistent way and successfully fetch them.
5. **Login feature** requires much more refactoring of code than we anticipated. We have to redesign and refine API, DAOs and Model on back-end a lot for processing and storing login information as well as managing user-file information in database.

### If We could Go Back?
As we said above, there were many difficulties when we at the beginning of our project. So if we could go back to the very start of this project, we would make some improvements:

* Do sufficient research to collect information we need. We developed front-end and back-end in different frameworks -- Spark and React, which are not easy to be combined at the beginning. Later we had to change to Javalin as our back-end framework so that both parts can work together. It wasted lots of works and time. This will not happen in the next project!
* We didn't use some feature in GitHub, for example, branches until instructors asked to do so. All the team members worked in the master branch so we can easily conflict with each other in the repository. After using branches, we worked on our own branches and merged with master branch if needed, which makes the development more smoothly.
* Be patient when debugging. Sometimes we got stuck by bugs and just could not figure them out for several hours, but maybe after a cup of coffee suddenly we noticed the problem. We would definitely be more patient if we could start again.

### Looking Ahead
Besides the remaining 2 nice-to-haves that we could implement, we think there are many other cool features that can be implemented to make this application a more powerful education tool:

* Currently the style of presentation slides is preset in our code. In future, we could open the styling design to users for customization. This could be achieved by allowing users to upload their own CSS files.
* Another feature would be online editing/realtime rendering. If the user were able to edit Markdown online and to have a separate window showing how it looks like in real time after converting markdown to slides, it would provide a better user experience, especially for those who don't have much experience in Markdown writing.
* Currently, if the presenter wants to edit an existing presentation, he/she can only upload a new one (optionally delete the old one). Version control would be a very useful feature that allows the presenter to make modifications on an existing presentation file, as well as go back to the older version.
* For the quiz design, currently we limit the format of quiz to be MCQ with 4 questions at most. In the future, we plan to extend the format of quiz such as allowing instructors to write essay questions or MCQ with multiple answers.
* The design of quiz in our application is more for interactions between students and instructors than actual grading. If instructors want their quizzes closer to the format of an actual exam, some encryption processes and more strict access to files will be needed.

### To Our Advisor
Julia really helps us a lot through the entire 5 iterations. She always provides her best insights and suggestions on our project, from drawing up a blueprint to developing the application as well as improving the user experience. Sometimes we felt that she was a bit strict, but it turns out she pushes the best of us and we wouldn't have accomplished all of these without her support and high expectation for us.

She has always been very responsive to our questions and emails. We really appreciate her time and effort for this semester, especially under the circumstance of remote teaching. Thank you so much Julia!

