import React , { Component } from  'react';
import Marpit from '@marp-team/marpit'
import axios from 'axios'
import logo from './fig/logo.png';
import './App.css';
import MyUpload from './components/Upload'
import QuizPage from "./components/QuizPage";
// // import Convert from '../src/marp'
// // import InputFileReader from '../src/marked'
// const marpit = new Marpit()
// // 2. Add theme CSS
// const theme = `
//             /* @theme example */
//
//             section {
//               background-color: #369;
//               color: #fff;
//               font-size: 30px;
//               padding: 40px;
//             }
//
//         h1,
//         h2 {
//           text-align: center;
//           margin: 0;
//         }
//
//         h1 {
//           color: #8cf;
//         }
//         `
// marpit.themeSet.default = marpit.themeSet.add(theme)

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            quizFlag: 0
        };

    }



    callback=(quiz)=>{
        this.setState({quiz : quiz, quizFlag : 1});
    }

    renderQuizPage() {
        return (
            <QuizPage/>
        );
    }

    renderUploadPage() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <MyUpload callback={this.callback}/>

                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn QuizHero
                    </a>
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
