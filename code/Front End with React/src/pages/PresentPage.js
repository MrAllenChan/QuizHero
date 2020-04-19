import React, { Component } from 'react';
import Quiz from '../components/Quiz';
import ResultPresenter from '../components/ResultPresenter';
import axios from 'axios'
import {Button, Icon} from "antd";
import Slides from "../components/Spectacle";
import {BASE_URL} from "../config/config"

class PresentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            questionCounter : 1,
            question: '',
            answerOptions: [],
            // answer: '',
            // answersCount: {},
            result: '',
            fileId: props.location.query.fileId,
            quizCounter : 0,
            quizList: props.location.query.quiz,
            quizQuestions:props.location.query.quiz[0],
            slides: props.location.query.slidesString
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.skipQuestion = this.skipQuestion.bind(this);
    }

    componentDidMount() {
        console.log(this.state.quizQuestions)
        const shuffledAnswerOptions = this.state.quizQuestions.map(question =>
            this.shuffleArray(question.answers)
        );
        this.setState({
            question: this.state.quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        console.log(event.currentTarget.value);
        if (this.state.questionId < this.state.quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(), 300);
        }
    }

    setUserAnswer(answer) {
        var answerArray = answer.split(" ");
        var type = answerArray[0];
        var questionCounter = answerArray[1];
        // var answerContent = answerArray[2];
        console.log(answerArray)
        // this.setState((state, props) => ({
        //     answersCount: {
        //         ...state.answersCount,
        //         [answer]: (state.answersCount[type] || 0) + 1
        //     },
        //     answer: type
        // }));

        //send choice to back-end
        // const BASE_URL = document.location.origin;
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

    // setNextPart() {
    //     const questionId = 1;
    //     const counter = 0;
    //     const quizCounter = this.state.quizCounter + 1;
    //     const questionCounter = this.state.questionCounter + 1;
    //     const quizQuestions = this.state.quizList[quizCounter];
    //     const shuffledAnswerOptions = quizQuestions.map(question =>
    //         this.shuffleArray(question.answers)
    //     );
    //
    //     this.setState({
    //         questionId : questionId,
    //         counter : counter,
    //         quizCounter : quizCounter,
    //         quizQuestions : quizQuestions,
    //         question: quizQuestions[0].question,
    //         answerOptions: shuffledAnswerOptions[0],
    //         questionCounter: questionCounter
    //
    //     })
    //
    // }

    skipQuestion() {
        if (this.state.questionId < this.state.quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(), 300);
        }
    }

    // getResults() {
    //     const answersCount = this.state.answersCount;
    //     const answersCountKeys = Object.keys(answersCount);
    //     const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    //     const maxAnswerCount = Math.max.apply(null, answersCountValues);
    //
    //     return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    // }

    setResults(result) {
        this.setState({
            result : 1
        });
    }

    renderQuiz() {
        return (
            <div>
                <Quiz
                    answer={this.state.answer}
                    answerOptions={this.state.answerOptions}
                    questionId={this.state.questionId}
                    question={this.state.question}
                    questionTotal={this.state.quizQuestions.length}
                    onAnswerSelected={this.handleAnswerSelected}
                    questionCounter={this.state.questionCounter}
                />
                <Button
                    onClick={this.skipQuestion}>
                    <Icon /> Skip
                </Button>
            </div>
        );
    }

    toQuizCallback = (quizBlockNumber) => {
        console.log(quizBlockNumber)

        const quizQuestions = this.state.quizList[quizBlockNumber];

        const shuffledAnswerOptions = quizQuestions.map(question =>
            this.shuffleArray(question.answers)
        );
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
            answerOptions: shuffledAnswerOptions[0],
            quizFlag : 1,
            questionCounter : questionCounter
        })
    };

    toSlidesCallback=()=>(
        this.setState({quizFlag : 0,
        result : 0})
    )


    renderResult() {
        return <ResultPresenter fileId={this.state.fileId} toSlidesCallback={this.toSlidesCallback} />;
    }

    renderQuizPages () {
        return (
            <div className="Quiz-page">
                <div className="Quiz-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    {/*<h2>React Quiz</h2>*/}
                </div>
                {this.state.result ? this.renderResult() : this.renderQuiz()}

            </div>
        )
    }

    renderSlides () {
        return (
            <div>
                <Slides toQuizCallback={this.toQuizCallback}
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

export default PresentPage;
