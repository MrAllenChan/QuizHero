import React , { Component } from  'react';
import logo from './fig/logo.png';
import './App.css';
import {Button} from 'antd';
import MyUpload from './components/Upload'
import QuizPage from "./components/QuizPage";
import quizStatistic from "./components/QuizStatistic"
// import {
//     BrowserRouter,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";

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

    statisticButtonClicked=()=>{
        // window.location.reload("/quizStatistic");
        window.location = "/quizStatistic"
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
            
                {/* <BrowserRouter>
       <div>
         <Route path="/" component={App}>
           <Route path="/quizStatistic" component={QuizStatisticPage}/>
         </Route>
      </div>
    </BrowserRouter> */}
    </div>
        );
    }

}

export default App;
