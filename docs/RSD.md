# Requirement Specification Document

## Problem Statement 

Instructors want to create slides including quizzes to share with students. Existing solution is to first upload slides (usually created in the format of markdown), add slides and additional content to the web page and share its link. This process involves the use of many plugins and software applications, making it redundant and hard to edit afterwards. Our application simplifies this process by directly converting a markdown file to a web page containing all contents, including slides, quizzes and other interactive contents. Instructors can easily change the presentation flow by editing the markdown file.


## Potential Clients

- Instructors who want to create interactive slides online.
- Students who need to view slides and take quizzes.

## Proposed Solution

Develop a website that enables instructors to create quizzes and slides from markdown and allows students to finish the quizzes online.


## Functional Requirements
> List the (functional) requirements that software needs to have in order to solve the problem stated above. It is useful to write the requirements in form of **User Stories** and group them into those that are essential (must have), and those which are non-essential (but nice to have).

### Must have

* As an instructor, I want to upload a markdown file containing the quiz questions and lecture slides, so that I can start a quiz during the class.
* As a student, I want to answer the quiz so that I can interact with the instructor in class.
* As an instructor, I also want to have a presenter mode to see all the contents, my notes  and quiz statistics, so that I can learn my students’ performance.


### Nice to have

* As an instructor, I want to log in on the website, so that I can review my presentation history.
* As a student I want to download the presentation in PDF format so that I can review it after class.
* As an instructor, I want to set a timer module, so students need to complete the quiz or discussion within the time limit.  
* As an instructor, I want to set a limitation of the slides, so that students cannot view the slides I haven’t presented.


## Software Architecture 

This will be a Web-based application and will conform to the Client-Server software architecture. We need the server to store, analyze, modify and send back relevant data, and we have clients to access the server to get necessary data.



