/**
 * StudentPage renders presenter's version of slides and quizzes.
 */

import React, { Component } from 'react';
import Quiz from '../components/Quiz';
import ResultStudent from '../components/ResultStudent';
import axios from 'axios'
import Slides from "../components/SpectacleStudent";
import {BASE_URL} from "../config/config"
import {message} from "antd";

class StudentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionCounter : 1,
            questionId: 1,
            question: '',
            answerOptions: [],
            result: '',
            fileId: JSON.parse(localStorage.getItem("data")).fileId,
            quizBlockCounter : 0,
            quizList: JSON.parse(localStorage.getItem("data")).quiz,
            quizQuestions:JSON.parse(localStorage.getItem("data")).quiz[0],
            slides: JSON.parse(localStorage.getItem("data")).slidesString,
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        this.setState({
            question: this.state.quizQuestions[0].question,
            answerOptions: this.state.quizQuestions[0].answers
        });
    }

    /**
     * check whether it is the last question after selecting an answer.
     */
    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        console.log(event.currentTarget.value);
        if (this.state.questionId < this.state.quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(), 300);
        }
    }

    /**
     * Send the chosen answer to the server.
     */
    setUserAnswer(answer) {
        var answerArray = answer.split(" ");
        var type = answerArray[0];
        var questionCounter = answerArray[1];
        const formData = {
            fileId : this.state.fileId,
            questionId : parseInt(questionCounter),
            choice : type
        }
        console.log(formData)
        axios
            .post(BASE_URL+"/record", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(() => {
                console.log("upload success");
            })
            .catch((error) => {
                console.log("error")
            });
    }

    /**
     * set parameters to be the next question.
     */
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        const questionCounter = this.state.questionCounter + 1;
        // console.log(this.state.quizQuestions);
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.state.quizQuestions[counter].question,
            answerOptions: this.state.quizQuestions[counter].answers,
            answer: '',
            questionCounter: questionCounter
        });
    }

    setResults(result) {
        this.setState({
            result : 1
        });
    }

    /**
     * Render the quiz page
     */
    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={this.state.quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
                questionCounter={this.state.questionCounter}
            />
        );
    }


    renderResult() {
        return <ResultStudent toSlidesCallback={this.toSlidesCallback} />;
    }

    /**
     * This function sends a get request to backend to check whether students can do the quiz.
     */
    checkQuizPermission = (quizBlockNumber) => {
        let params = {
            fileId: this.state.fileId
        }
        axios.get(BASE_URL + "/quizpermission",  {params})
            .then(res => {
                console.log("AAA", res.data);
                this.setState({
                    quizpermission : res.data,
                });
                this.toQuizCallback(quizBlockNumber);
            })
            .catch((error) => {
                alert("File doesn't exist!")
            })
    }

    /**
     * This function initializes params needed for quiz page berore rendering it.
     */
    toQuizCallback = (quizBlockNumber) => {
        console.log(quizBlockNumber)
        if (this.state.quizpermission === true){
            message.success(`Start quiz for presentation ${this.state.fileId}.`)
            const quizQuestions = this.state.quizList[quizBlockNumber];
            const questionId = 1;
            const counter = 0;

            var questionCounter = 0;
            for (var i = 0; i < quizBlockNumber; i++) {
                questionCounter += this.state.quizList[i].length;
            }
            questionCounter ++;

            this.setState({
                questionId : questionId,
                counter : counter,
                quizQuestions : quizQuestions,
                question: quizQuestions[0].question,
                answerOptions: quizQuestions[0].answers,
                quizFlag : 1,
                questionCounter : questionCounter
            })
        }else{
            alert('You do not have permission to answer the quiz, please contact the presenter.')
        }


    };

    toSlidesCallback=()=> {
        this.setState({
            quizFlag: 0,
            result: 0
        });
    }

    renderQuizPages () {
        return (
            <div className="Quiz-page">
                <div className="Quiz-header">
                </div>
                {this.state.result ? this.renderResult() : this.renderQuiz()}

            </div>
        )
    }

    renderSlides () {
        return (
            <div>
                <Slides toQuizCallback={this.checkQuizPermission}
                        slides={this.state.slides}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.quizFlag ? this.renderQuizPages() : this.renderSlides()}
            </div>


        );
    }
}

export default StudentPage;
