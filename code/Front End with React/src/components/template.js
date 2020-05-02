/**
 * This is a template for user to download on the First page
 * @type {string}
 */

const template = `# QuizHero Demonstration

See our GitHub repository:

- https://github.com/jhu-oose/2020-spring-group-QuizHero

Rules to write your quiz --- simple as original Markdown syntax:

\`\`\`
> Question: Which framework do you use to develop your backend server?
* [ ] A. SpringBoot
* [x] B. Javalin
* [ ] C. SparkJava
* [ ] D. Tomcat
\`\`\`

Notes: This is my private notes. The student can not see that.

---

## Start Presenter Mode!

- Press **\`Option + P\`** to open presenter mode. Open a second audience window & view your private notes to better support your presentation.

<p align = "center">
<img width = "50%" src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004291524presenter_mode.gif' alt='202004291524presenter_mode'/>
</p>

Notes: I should go to presenter mode to see my private notes.

---

## Share with your students!

- **Share the file code** with your students so they can fetch the presentation slides!

<p align="center">
<img width = "50%" src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290306stu_view.gif' alt='202004290306stu_view'/>
</p>

Notes: This feature is fantastic. Only I can see the notes in presenter mode.

---

## Start quiz and view statistics

- click **\`start quiz\`** button to **release quiz permission** (Students won't be able to take quiz without permission.)

<p align = "center">
<img width = "50%" src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290301ins_quiz_stat.gif' alt='202004290301ins_quiz_stat'/>
</p>

Notes: Let the students start quiz now.

---

## Contents of the course: let's start!

* Design Principles: SOLID

* Several Funny Quizzes!

<p align="left">
  <img width="15%" src="https://media.giphy.com/media/xohHbwcnOhqbS/giphy.gif">
</p>

Notes: This feature is fantastic. Only I can see the notes in presenter mode.

---

## What are design principles?

> A good software design organizes the code in a way that it is "easy to understand, change, maintain and reuse."

Design principles are (often opinionated) guidelines derived from experience of programmers about software design that usually take the form of do's and don'ts. They are the Commandments of OO Programming.

---

## The SOLID design principles

The SOLID design principles are some of the best-known design principles in object-oriented software development. SOLID is a mnemonic acronym for the following five principles:

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

<p align = "center">
<img width = "50%" src='https://i.imgur.com/bXGiP7R.jpg' alt='bXGiP7R'/>
</p>

- New functionality does not require a rewrite of existing code
- Also applies **Dependency Inversion Principle** (DIP)

---

## Quiz Part 1: Are you ready?

---

> Question: What is your favorite course?
* [ ] A. AI
* [x] B. OOSE
* [ ] C. Algorithm
* [ ] D. Computer Network

> Question: Which design principles do you apply?
* [x] A. Single Responsibility Principle
* [ ] B. Open/Closed Principle
* [ ] C. Liskov Substitution Principle
* [ ] D. Interface Segregation Principle

---

## Dependency Inversion Principle

**High-level classes shouldn’t have to change because low-level classes change.**

The dependency inversion principle **does not only change the direction** of the dependency; it **splits the dependency** between the high-level and low-level modules by **introducing an abstraction** between them. So in the end, you get two dependencies:

- the high-level module depends on the abstraction, and
- the low-level depends on the same abstraction.

---

## Quiz Part 2: Go for it!

---

> Question: Which SOLID design principle is most closely described by the given statement: classes should depend on abstractions rather than implementations.
* [ ] A. Interface Segregation Principle
* [ ] B. Open/Closed Principle.
* [ ] C. Liskov Substitution Principle.
* [x] D. Dependency Inversion Principle

> Question: Which is one of the most widely used java design pattern?
* [ ] A. Composite Pattern
* [ ] B. Dependency Injection Pattern
* [x] C. Factory Pattern
* [ ] D. Singleton Pattern

> Question: Which framework do you use to develop your backend server?
* [ ] A. SpringBoot
* [x] B. Javalin
* [ ] C. SparkJava
* [ ] D. Tomcat

---

## Hope you enjoy QuizHero!

- Feel excited? Start writing your own presentation slides!!

<p align = "center">
<img width = "50%" src='https://raw.githubusercontent.com/MrAllenChan/uPic/master/uPic/202004290230ins_view_slides.gif' alt='202004290230ins_view_slides'/>
</p>

Notes: this is my private notes. The student can not see that.`

export default template;