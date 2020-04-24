# Requirement Specification Document

## Problem Statement 

Instructors want to create slides including quizzes to share with students during class. Existing solution is to first upload slides (usually created in the format of markdown), add slides and additional content to the web page and share its link. This process involves the use of many plugins and software applications, making it redundant and hard to edit afterwards. Our application simplifies this process by directly converting a markdown file to a web page containing all contents, including slides, quizzes and other interactive contents. Instructors can easily change the presentation flow by editing the markdown file.


## Potential Clients

- Instructors who want to create interactive slides online.
- Students who need to view slides and take quizzes.

## Proposed Solution

Develop a web application, on which instructors can upload markdown files including slides and quizzes written by themselves, and get the converted html pages. After uploading the markdown file, the generated URL will allow students to view the slides and answer the quizzes online, thus interacting with their instructors. The application is able to collect students' answers of quizzes, store the answers, and display the statistical results to instructors, who will then have a good overview of students' performance.


## Functional Requirements
> List the (functional) requirements that software needs to have in order to solve the problem stated above. It is useful to write the requirements in form of **User Stories** and group them into those that are essential (must have), and those which are non-essential (but nice to have).

### Must have

* As an instructor, I want to upload a markdown file containing the quiz questions and lecture slides, so that I can start a quiz during the class.
* As a student, I want to answer the quiz so that I can interact with the instructor during class.
* As a student, I want to view the slides uploaded by the instructer so that I can keep pace with the lesson.
* As an instructor, I want to collect students' answers and see relevant statistical data on my computer, so that I can know how students perform.
* As an instructor, I want to have a presenter mode to see all my slides, quizzes and notes, so that I can teach a course and have a better overview of my teaching content.
* As an instructor, I want to log in to the website, so that I can have my personal record.
* As an instructor, I want to review my presentation history, so that I can go through what I have taught.

### Nice to have

* As an instructor, I want to control the permission of starting quiz inside the slides, so that I can prompt my students to answer the quiz at the right time.
* As an instructor, I want to control the permission of opening the files I upload, so that I can prompt my students to view the slides at the right time.
* As a student, I want to download the presentation onto my own computer, so that I can review it after class.
* As an instructor, I want to set a timer module, so students need to complete the quiz or discussion within the time limit. 


## Software Architecture 

This will be a Web-based application and will conform to the Client-Server software architecture. We need the server to store, analyze, modify and send back relevant data, and we have clients to access the server to get necessary data.



