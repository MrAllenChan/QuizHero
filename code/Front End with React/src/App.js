import React , { Component } from  'react';
import logo from './fig/logo.png';
import './App.css';
import MyUpload from './components/Upload'
import QuizPage from "./components/QuizPage";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz:'',
            quizFlag: 0
        };

    }

    callback=(quiz)=>{
        this.setState({quiz})
        this.setState({quizFlag : 1});
    }

    renderQuizPage() {
        console.log(this.state.quiz)
        return (
            <QuizPage
            questions={this.state.quiz}
            />
        );
    }

    renderUploadPage = () => {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <MyUpload callback={this.callback}/>

                    {/*<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">*/}
                    {/*    Learn QuizHero*/}
                    {/*</a>*/}
                </header>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.quizFlag ? this.renderQuizPage() : this.renderUploadPage()}
            </div>
        );
    }

}

export default App;
