import React, { Component } from "react";
import {Form, Input, Button, Checkbox, message, Icon} from "antd";
import logo from "../fig/logo.png";
import axios from "axios";
import {BASE_URL} from "../config/config";

const {Search} = Input;

class StudentRequestPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            url : "",
            MarkDownFile : ""
        }
    }

    onSearch = (value, event) => {
        const formData = new formData();
        formData.append('url', value);
        console.log("Send data to backend", formData);
        axios.post(BASE_URL + "/upload", formData)
            .then(res => {
                console.log("CCC", res.data);
                this.setState({
                    MarkDownFile: res.data
                })
            })
    }

    sendURL =() => {
        var file = this.state.file;
        var p = new Promise(function (resolve, reject){
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', localStorage.getItem("instructorId"));
            console.log("Send data to backend", formData);
            axios.post(BASE_URL + "/upload", formData)
                .then(res => {
                    console.log("CCC",res.data);
                    // this.setState({fileId : res.data.fileId})
                    resolve(res.data.fileId);
                    // alert("File uploaded successfully.");
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return p;
    }



    
    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <img src={logo} className="App-logo" alt="logo"/>
                    {/*<input type="text"/>*/}
                    <Search
                        style={{width: 400}}
                        placeholder="input shared url"
                        enterButton="Go"
                        size="large"
                        onSearch={this.onSearch}
                    />
                </header>
            </div>
        );
    }
}

export default StudentRequestPage;