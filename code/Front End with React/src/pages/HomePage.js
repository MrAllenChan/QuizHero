import React , { Component } from  'react';
import logo from '../fig/logo.png';
import {Button, Icon} from 'antd';
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

class FirstPage extends Component {

    constructor(props) {
        super(props);

    }

    toLogin = () => {
        window.location = "/login";
    };

    toEnterCode = ()=>{
        window.location = "/StudentRequestPage";
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <img src={logo} className="App-logo" alt="logo"/>
                    <div>
                        <Button onClick={this.toLogin} size={"large"} style={{marginRight: 10}}>
                            <Icon/>I'm a Presenter
                        </Button>
                        <Button onClick={this.toEnterCode} size={"large"} style={{marginRight: 10}}>
                            <Icon/>I'm a Student
                        </Button>
                    </div>

                </header>
            </div>
        );
    }

}

export default FirstPage;
