import React , { Component } from  'react';
import {Button, Icon} from 'antd';
import logo from '../fig/logo.png';
import template from "../components/template";
/**
 * The page HomePage is the first page when visiting QuizHero. The user choose to be a presenter or a student here.
 */

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

    /**
     * onDownload is a callback function triggered when click the "download template" button.
     */
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
