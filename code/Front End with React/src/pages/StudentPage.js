import React, { Component } from 'react';
import Quiz from '../components/Quiz';
import ResultStudent from '../components/ResultStudent';
import axios from 'axios'
import Slides from "../components/Spectacle";

class StudentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            upload: 0,
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: '',
            fileId: props.location.query.fileId,
            quizQuestions: props.location.query.quiz,
            slides: props.location.query.slidesString,
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {

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
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setUserAnswer(answer) {
        var answerArray = answer.split(" ");
        var type = answerArray[0];
        var questionId = answerArray[1];
        var answerContent = answerArray[2];
        console.log(answerArray)
        this.setState((state, props) => ({
            answersCount: {
                ...state.answersCount,
                [answer]: (state.answersCount[type] || 0) + 1
            },
            answer: type
        }));

        //send choice to back-end
        const BASE_URL = document.location.origin;
        const formData = {
            fileId : this.fileId,
            questionId : parseInt(questionId),
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
        // console.log(this.state.quizQuestions);
        this.setState({
            counter: counter,
            questionId: questionId,
            question: this.state.quizQuestions[counter].question,
            answerOptions: this.state.quizQuestions[counter].answers,
            answer: ''
        });
    }

    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    }

    setResults(result) {
        if (result.length === 1) {
            this.setState({ result: result[0] });
        } else {
            this.setState({ result: 'Undetermined' });
        }
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={this.state.quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }


    renderResult() {
        return <ResultStudent quizResult={this.state.result} toSlidesCallback={this.toSlidesCallback} />;
    }

    toQuizCallback = () => {
        this.setState(
            {quizFlag : 1}
        )
    };

    toSlidesCallback=()=>(
        this.setState({quizFlag : 0})
    )

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

export default StudentPage;
