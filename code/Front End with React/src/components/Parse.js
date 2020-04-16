import axios from "axios";
import {BASE_URL} from "../config/config";

const separateQuestion = (rawString, fileId) => {

    // rawstring分成slide array 和 question array,
    // 赋值给slideStringList, quizStringList

    var slides = new Array(100);
    var questions = new Array(100);
    for (var i = 0; i < 100; i ++) {
        slides[i] = new Array();
        questions[i] = new Array();
    }

    var sections = rawString.split("---\n\n")  // => section[]

    var index = 0;
    for (var i = 0; i < sections.length; i++) {

        const section = sections[i].split(" ");
        if (section[0] === ">") {
            questions[index].push(sections[i]);
            slides[index].push("$$$quiz$$$\n\n");

            console.log(index);
            console.log(questions[index]);
            index ++;
        } else {
            slides[index].push(sections[i])
        }
    }
    var i = 0;
    var slideString = new Array();
    var quizString = new Array();
    while (slides[i] != "") {
        slideString[i] = slides[i].join("---\n\n");
        if (questions[i] != "") {
            quizString[i] = questions[i].join("---\n\n");
        }
        i ++;
    }

    var questions = parseQuiz(quizString, fileId);
    var data = {
        quiz: questions,
        slidesString: slideString,
        fileId: fileId
    }
    return data;
}

//question变成quizLists(quiz, quizBlock, quizLists)
const parseQuiz = (quizString, fileId) => {
    // this.separateQuestion(this.state.rawString);
    // var quizList = new Array();
    // var data = this.state.quizString;
    // var quizzes = data.split("\n\n");
    // var parsedChoice;
    // console.log(this.state.quizString);
    // console.log(this.state.quizString.length);
    var length = quizString.length;
    var quizLists = new Array();
    // for(var i = 0; i < length; i ++) {
    //     quizLists[i]=new Array();
    // }
    console.log(length);
    var count = 1;
    for (var index = 0; index < length; index ++) {
        var data = quizString[index];
        console.log(index);
        console.log(quizString[index]);
        var quizzes = data.split("\n\n");
        if (quizzes[quizzes.length - 1] == "") {
            quizzes.splice(quizzes.length - 1, 1);
        }
        console.log(quizzes);
        var parsedChoice;
        var quizBlock = new Array();
        console.log(quizBlock);

        for (var i = 0; i < quizzes.length; i++) {
            var choice = "A";
            var quiz = {
                question: "",
                answers: []
            };
            var quizArray = quizzes[i].split("\n");
            for (var j = 0; j < quizArray.length; j++) {
                var line = quizArray[j];
                if (line.length > 1) {
                    console.log(line)
                    if (line.slice(0, 11) === "> Question:") {
                        // parse question
                        quiz.question = line.slice(12, line.length);
                        // quiz.question = parsedQuestion.join(" ");
                    } else if (line[0] === '*' && line.slice(2, 5) === "[x]") {
                        // parse correct choice
                        parsedChoice = line.slice(6, line.length);
                        // parsedChoice = parsedChoice.join(" ");
                        quiz.answers.push({
                            type: choice,
                            content: parsedChoice
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);

                        // send correct answer to backend

                        const formData = {
                            fileId: fileId,
                            // questionId : quizBlock.length + 1,
                            questionId: count,
                            answer: String.fromCharCode(charCode),
                            countA: 0,
                            countB: 0,
                            countC: 0,
                            countD: 0,
                        }
                        count++;
                        console.log(formData)
                        axios
                            .post(BASE_URL + "/quiz", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            })
                            .then(res => {
                                console.log("quiz initialize success");
                            })
                            .catch((error) => {
                                console.log("error")
                            });
                    } else if (line[0] === '*' && line.slice(2, 5) === "[ ]") {
                        // parse wrong choice
                        parsedChoice = line.slice(6, line.length);
                        // parsedChoice = parsedChoice.join(" ");
                        quiz.answers.push({
                            type: choice,
                            content: parsedChoice
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);
                    }
                }
            }
            quizBlock.push(quiz);
        }
        quizLists.push(quizBlock);
        console.log(quizLists)
    }
    console.log(quizLists);
    return quizLists;
};

export default separateQuestion;