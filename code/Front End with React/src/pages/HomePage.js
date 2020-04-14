import React , { Component } from  'react';
import logo from '../fig/logo.png';
import {Button} from 'antd';
import MyUpload from './UploadPage'
import PresentPage from "./PresentPage";
import StudentPage from "./StudentPage";
import Slides from "../components/Spectacle"
import quizStatistic from "../components/QuizStatistic"
import {dimValueGetter} from "echarts/src/component/marker/markerHelper";
// import {
//     BrowserRouter,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz : props.quiz,
            slidesString : props.slidesString,
            slidesFlag: 0,
            quizFlag: 0,
            studentFlag: 0
        };
        this.quizCallback = props.quizCallback;
        this.slidesCallback = props.slidesCallback;
    }

    // quizString
    callback=(quiz)=>{
        this.setState({quiz:quiz});
        this.setState({slidesFlag : 1});
    }

    // slidesString
    callback1=(slidesString)=>{
        this.setState({slidesString : slidesString})
    }

    // take quiz button (Spectacle)
    callback2=()=>{
        this.setState({quizFlag : 1})
    }

    // back button from quiz (Button, Result, QuizPage
    callback3=()=>(
        this.setState({quizFlag : 0})
    )

    callback4=()=>(
        this.setState({studentFlag : 1})
    )

    statisticButtonClicked=()=>{
        // window.location.reload("/quizStatistic");
        window.location = "/quizStatistic"
    }



    renderStudentPage() {
        console.log(this.state.quiz)
        return (
            <div>
                {this.state.quizFlag ? <StudentPage questions={this.state.quiz} callback3={this.callback3}/> : <Slides callback2={this.callback2} slidesString={this.state.slidesString}/>}
            </div>

            // <Slides />
            // <PresentPage
            // questions={this.state.quiz}
            // />
        );
    }

    renderPresenterPage() {
        return (
            <div>
                {this.state.quizFlag ? <PresentPage questions={this.state.quiz} callback3={this.callback3}/> : <Slides callback2={this.callback2} slidesString={this.state.slidesString}/>}
            </div>

            // <Slides />
            // <PresentPage
            // questions={this.state.quiz}
            // />
        );
    }

    renderUploadPage = () => {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <MyUpload quizCallback={this.quizCallback}
                              slidesCallback={this.slidesCallback}
                              // callback4={this.callback4}
                    />
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
                {/*{this.state.slidesFlag ? (this.state.studentFlag ? this.renderStudentPage() : this.renderPresenterPage()) : this.renderUploadPage()}*/}
                {this.renderUploadPage()}
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

export default HomePage;
