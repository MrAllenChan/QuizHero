import React, { Component } from "react";
import {Form, Input, Button, Checkbox, message, Icon} from "antd";
import {Link} from "react-router-dom"
import logo from "../fig/logo.png";
import axios from "axios";
import {BASE_URL} from "../config/config";
import separateQuestion from "../components/Parse";
import marpitConvert from "../components/Marpit";

const {Search} = Input;

class StudentRequestPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fileId : "",
            permission : false,
            MarkDownFile : "",
            display_name:'none'
        }
    }

    onSearch = (value, event) => {
        let params = {
            fileId: value
        }

        axios.get(BASE_URL + "/quizpermission",  {params})
            .then(res => {
                console.log("AAA", res.data);
                this.setState({
                    fileId : value,
                    permission : res.data,
                    MarkDownFile : ""
                }, this.fetchFile);
                alert(`File ${value} found.`)
            })
            .catch((error) => {
                alert("File doesn't exist!")
            })

    }

    fetchFile =()=> {
        let params = {
            fileId: this.state.fileId
        }

        if (this.state.permission === true){
            axios.get(BASE_URL + "/fetch",  {params})
                .then(res => {
                    console.log("AAA", res.data);
                    this.setState({
                        MarkDownFile: res.data,
                    }, this.generateSlides)
                    alert(`File ${this.state.fileId} fetched successfully.`)
                })
                .catch((error) => {
                    alert(`Fail to fetch File ${this.state.fileId}.`)
                })
        }else{
            alert(`Sorry, you don't have the permission to access file ${this.state.fileId}. Please contact the presenter.`)
        }
    }

    generateSlides = () => {
        this.callSeparateQuestion();
        this.state.display_name = this.display_name();
    }

    callSeparateQuestion =()=>{
        const data = separateQuestion(this.state.MarkDownFile, this.state.fileId);
        console.log(data)
        this.setState({data : data});
        this.getMarpit();
    }

    // Marpit for download
    getMarpit=()=>{
        const marpitResult = marpitConvert(this.state.MarkDownFile)
        this.setState({
            marpitResult : marpitResult
        })
    }


    // onChange = (e) => {
    //     this.setState({fileId : e})
    // }


    download = () => {
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
        exportRaw('filename.html', this.state.marpitResult);
    }

    display_name () {
        if (this.state.display_name === 'none') {
            this.setState({
                display_name:'block'
            })
        }else if (this.state.display_name === 'block'){
            this.setState({
                display_name:'none'
            })
        }
    };
    
    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <img src={logo} className="App-logo" alt="logo"/>
                    {/*<input type="text"/>*/}
                    {/*<Input placeholder="Please enter code" onChange={this.onChange}/>*/}

                    {/*<Link to={{pathname: '/student', query: this.state.data}}>*/}
                        <Search
                            style={{width: 400}}
                            placeholder="input shared url"
                            enterButton="Search"
                            size="large"
                            onSearch={this.onSearch}
                        />
                    <div style={{display:this.state.display_name}}>
                    <Link to={{pathname: '/student', query: this.state.data}}>
                        <Button onClick={this.onClick} size={"large"} style={{marginLeft: 10}}>
                            <Icon/>Go to Presentation
                        </Button>
                    </Link>
                    <Button onClick={this.download} size={"large"} style={{marginLeft: 10}}>
                        <Icon/>Download file
                    </Button>
                    </div>
                    {/*</Link>*/}
                </header>
            </div>
        );
    }
}

export default StudentRequestPage;