import React , { Component } from  'react';
import logo from './fig/logo.png';
import './App.css';
import MyUpload from './components/Upload'
import QuizPage from "./components/QuizPage";
// import Convert from '../src/marp'
// import InputFileReader from '../src/marked'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <MyUpload></MyUpload>


                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn QuizHero
                    </a>
                </header>
                <QuizPage></QuizPage>
            </div>
        );
    }

}

export default App;
