import React, { Component } from 'react';
import Quiz from '../components/Quiz';
import ResultPresenter from '../components/ResultPresenter';
import axios from 'axios'
import {Button, Icon, message} from "antd";
import Slides from "../components/SpectaclePresenter";
import {BASE_URL} from "../config/config"
/**
 * PresentPage renders presenter's version of slides and quizzes.
 */
class PresentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            questionCounter : 1,
            question: '',
            answerOptions: [],
            result: '',
            fileId: JSON.parse(localStorage.getItem("data")).fileId,
            quizCounter : 0,
            quizList: JSON.parse(localStorage.getItem("data")).quiz,
            quizQuestions:JSON.parse(localStorage.getItem("data")).quiz[0],
            slides: JSON.parse(localStorage.getItem("data")).slidesString
        };
        console.log(this.state.quizList)
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        console.log(this.state.quizQuestions)
        this.setState({
            question: this.state.quizQuestions[0].question,
            answerOptions: this.state.quizQuestions[0].answers
        });
    }

    handleAnswerSelected(event) {
        /**
         * check whether it is the last question after selecting an answer.
         */
        console.log(event.currentTarget.value);
        if (this.state.questionId < this.state.quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(), 300);
        }
    }

    setNextQuestion() {
        /**
         * set parameters to be the next question.
         */
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        const questionCounter = this.state.questionCounter + 1;
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

    renderQuiz() {
        /**
         * Render the quiz page
         */
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
                <h3>Presenter's response will not be recorded.</h3>
                <Button
                    onClick={this.handleAnswerSelected}>
                    <Icon /> Skip
                </Button>
            </div>
        );
    }

    startQuiz=()=>{
        /**
         * This function sends a post request to backend to set quizpermission to true so that students can do the quiz.
         */
        const formData = new FormData();
        formData.append('fileId', this.state.fileId);
        formData.append('permission', true);
        axios.post(BASE_URL + "/quizpermission", formData)
            .then(()=> message.success(`Students can now start quiz for presentation ${this.state.fileId}`))
            .catch(()=> message.error('error'));
    }

    stopQuiz=()=>{
        /**
         * This function sends a post request to backend to set quizpermission to false so that students are not allowed to do the quiz.
         */
        const formData = new FormData();
        formData.append('fileId', this.state.fileId);
        formData.append('permission', false);
        axios.post(BASE_URL + "/quizpermission", formData)
            .then(()=> message.success(`Students stop answering quiz for presentation ${this.state.fileId}`))
            .catch(()=> message.error('error'));
    }

    toQuizCallback = (quizBlockNumber) => {
        /**
         * This function initializes params needed for quiz page berore rendering it.
         */
        this.startQuiz();
        console.log(quizBlockNumber)
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
    };

    toSlidesCallback=()=>{
        this.stopQuiz();
        this.setState({
            quizFlag : 0,
            result : 0
        });
    }


    renderResult() {
        return <ResultPresenter fileId={this.state.fileId} toSlidesCallback={this.toSlidesCallback} />;
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
