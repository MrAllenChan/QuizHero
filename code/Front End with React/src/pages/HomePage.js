import React , { Component } from  'react';
import {Button, Icon} from 'antd';
import logo from '../fig/logo.png';
import template from "../components/template";
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

    onDownload = () => {
        function fakeClick(obj) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            obj.dispatchEvent(ev);
        }
        function exportRaw(name, data) {
            var urlObject = window.URL || window.webkitURL || window;
            var export_blob = new Blob([data]);
            var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            fakeClick(save_link);
        }
        exportRaw('template.md', template);
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
                    <a onClick={this.onDownload} style={{fontSize : 15, marginTop: 10}}>Download template</a>

                </header>
            </div>
        );
    }

}

export default FirstPage;
