const template = `# QuizHero Demonstration

See our GitHub repository:

- https://github.com/jhu-oose/2020-spring-group-QuizHero

Rules to write your quiz --- simple as original Markdown syntax:

\`\`\`
> Question: Which framework do you use to develop your backend server?
* [ ] SpringBoot
* [x] Javalin
* [ ] SparkJava
* [ ] Tomcat
\`\`\`

Notes: this is my private notes. The student can not see that.

---

## Contents of the course

* Design Principles: SOLID

* Several Funny Quizzes!

Notes: This feature is fantastic. Only I can see the notes in presenter mode.

---

## Now let's start!

![datboi](https://media.giphy.com/media/xohHbwcnOhqbS/giphy.gif)

Notes: I can put anything here. I love my small cheat sheet.

---

## What are design principles?

> A good software design organizes the code in a way that it is "easy to understand, change, maintain and reuse."

Design principles are (often opinionated) guidelines derived from experience of programmers about software design that usually take the form of do's and don'ts. They are the Commandments of OO Programming.

---

## The SOLID design principles

The SOLID design principles were promoted by *Robert C. Martin* and are some of the best-known design principles in object-oriented software development. SOLID is a mnemonic acronym for the following five principles:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

---

## Open/Closed Principle

**Classes should be open for extension but closed for modification.**

Essentially means design your application in a way to keep existing code from breaking when you implement new features.

- "Open to extension" means you can add new features.
- "Closed to modification" means the existing code (before adding a new feature) does not have to be modified when you added the new features.
 
---

## A good design example of Open/Closed Principle

---

## Quiz: part 1

Are you ready?

---

> Question: What is your favorite course?
* [ ] AI
* [x] OOSE
* [ ] Algorithm
* [ ] Computer Network

> Question: Which design principles do you apply?
* [x] Single Responsibility Principle
* [ ] Open/Closed Principle
* [ ] Liskov Substitution Principle
* [ ] Interface Segregation Principle

---

## Dependency Inversion Principle

**High-level classes shouldn’t have to change because low-level classes change.**

The dependency inversion principle **does not only change the direction** of the dependency; it **splits the dependency** between the high-level and low-level modules by **introducing an abstraction** between them. So in the end, you get two dependencies:

- the high-level module depends on the abstraction, and
- the low-level depends on the same abstraction.

---

## Quiz: part 2

Go for it!

---

> Question: Which framework do you use to develop your backend server?
* [ ] SpringBoot
* [x] Javalin
* [ ] SparkJava
* [ ] Tomcat

> Question: Which design pattern do you apply?
* [ ] Composite Pattern
* [x] Dependency Injection Pattern
* [ ] Factory Pattern
* [ ] Singleton Pattern

---

## Hope you enjoy QuizHero!

Notes: this is my private notes. The student can not see that.`

export default template;