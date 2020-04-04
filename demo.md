# QuizHero Demo Example

---

## QuizHero: a lightweight web app for creating presentations with quizzes from Markdown.

- See our Github homepage [here](https://github.com/jhu-oose/2020-spring-group-QuizHero
  ).

---

# What is it for?

- QuizHero is a lightweight web app for creating presentations with quizzes from Markdown. 
- Through this platform, instructors can create different versions of presentations, and students are able to view the slides and answer the quizzes online. 
- Our application will collect students' answers of quizzes, store the answers, and display the statistical results to instructors, who will then have a good overview of students' performance.

---

# How is it built?

This project uses Marpit framework to convert Markdown and CSS themes to slide decks, and an original framework to convert Markdown content to quizzes. The front-end is based on React framework, the application server is developed using Javalin, and the database is based on SQLite.

---

### Our Backend design (UML)

![](https://tva1.sinaimg.cn/large/00831rSTgy1gdfcbvjz8cj30hl0cb0u7.jpg)



---

> Question: What is your favorite course?
* [x] OOSE
* [ ] AI
* [ ] Algorithm
* [ ] Computer Network

> Question: Which design pattern do you apply?
* [ ] Singleton
* [ ] Decorater
* [x] Dependency Injection
* [ ] Abstract Factory

> Question: Which framework do you use to develop your backend server?
* [ ] SpringBoot
* [x] Javalin
* [ ] SparkJava
* [ ] Tomcat