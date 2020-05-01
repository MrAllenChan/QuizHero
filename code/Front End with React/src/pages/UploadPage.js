import { Upload, message, Button, Icon, Layout, Menu} from 'antd';
import React from "react";
import marpitConvert from '../components/Marpit'
import separateQuestion from "../components/Parse";
import axios from 'axios';
import {BASE_URL} from "../config/config"
import {Link} from "react-router-dom"
import {CopyToClipboard} from 'react-copy-to-clipboard'
import logo from "../fig/logo.png"

/**
 * UploadPage renders the page where the presenter can upload his/her markdown file.
 */

const { Header, Content, Footer } = Layout;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
};

class MyUpload extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        file:"",
        fileId:"",
        fileName:"",
        rawString:"",
        data:"",
        marpitResult:"",
        display_name:'none'
    }

    beforeUpload = (file) => {
        if (this.state.file === ""){
            console.log("FILEEE",file);
            this.setState({
                file:file
            });
        }else{
            alert("You can only upload one file at a time. Please delete the previous uploaded file.");
            return false;
        }
    }

    onChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            // Delete redundant file in fileList when user tries to upload a second file without deleting the first one
            if (info.fileList.length > 1){
                info.fileList.pop();
            }
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(info.file.name);
            this.setState({
                fileName :info.file.name
            })
            message.success(`${info.file.name} file uploaded successfully`);
            // Send uploaded
            this.sendFile()
                .then(this.readFile)
                .then(this.callSeparateQuestion);
            this.state.display_name = this.display_name('block');

        } else if (info.file.status === 'error') {
            console.log(info.file.name);
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onRemove = () => {
        this.setState({
            file: ""
        })
        this.state.display_name = this.display_name('none');
    }

    /**
     * download raw file or HTML file after uploaded.
     */
    onDownload = (fileType) => {
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

        if (fileType === "raw") exportRaw(this.state.fileName, this.state.rawString);
        else if (fileType === "HTML") exportRaw(`${this.state.fileName}.html`, this.state.marpitResult);
        else console.log("Wrong fileType provided")
    }

    /**
     * send markdown file to backend and set the database returned fileId to state
     */
    sendFile =() => {
        var file = this.state.file;
        var p = new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', localStorage.getItem("instructorId"));
            console.log("Send data to backend", formData);
            axios.post(BASE_URL + "/upload", formData)
                .then(res => {
                    console.log("CCC",res.data);
                    this.setState({fileId : res.data.fileId})
                    resolve(res.data.fileId);
                    // alert("File uploaded successfully.");
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return p;
    }

    /**
     * This is a function that read the uploaded file into a string.
     * @returns {Promise<unknown>}
     */

    readFile=()=>{
        var file = this.state.file;
        var p = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                // let content = e.target.result;
                this.setState({rawString : reader.result});
                resolve(reader.result);
            };
            reader.onerror = function (e) {
                reject(e);
            };
        });
        return p;
    }

    /**
     * CallSeparateQuestion is the function that parse the raw string to a JSON parameter which contains quizzes and slides.
     */
    callSeparateQuestion =()=>{
        var data = separateQuestion(this.state.rawString, this.state.fileId);
        console.log(data)
        data = JSON.stringify(data)
        localStorage.setItem("data",data)
        this.setState({data : data});
        this.getMarpit();
    }

    // Marpit for download
    getMarpit=()=>{
        const marpitResult = marpitConvert(this.state.rawString)
        this.setState({
            marpitResult : marpitResult
        })
    }

    startSharing=()=>{
        const formData = new FormData();
        formData.append('fileId', this.state.fileId);
        formData.append('permission', true);
        axios.post(BASE_URL + "/filepermission", formData)
            .then(()=> message.success(`Share code ${this.state.fileId} is copied on your clipboard`))
            .catch(()=> message.error('error'));
    }

    stopSharing=()=>{
        const formData = new FormData();
        formData.append('fileId', this.state.fileId);
        formData.append('permission', false);
        axios.post(BASE_URL + "/filepermission", formData)
            .then(()=> message.success(`File ${this.state.fileId} stop sharing`))
            .catch(()=> message.error('error'));
    }

    display_name (status) {
        this.setState({
            display_name:status
        })
    };
    
    handleLogOut(){
        localStorage.setItem("username",null)
        localStorage.setItem("instructorId",0)
        localStorage.setItem("isLogin",0)
        localStorage.setItem("data", null)
        window.location = "/login"
    }



    render(){
        const username = localStorage.getItem("username")?localStorage.getItem("username"):"";

        const logOutBtnStyle = {
                background: "none",
                border: "none",
                paddingLeft: "5px",
                color: "#1890FF",
                textDecoration: "underline",
                cursor: "pointer"
        };
        /**
         * Render NavBar and all other buttons on upload page.
         */
        return(
            <div className="App">
                <Header style={{height: 0, padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="white" mode="horizontal" defaultSelectedKeys={['1']}>

                        <Menu.Item key="1" style={{display:"inline-block",float:"left", marginLeft:"30px", width: "150px"}}>
                            <Link to={'/HomePage'}>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="2" style={{display:"inline-block",float:"left", width: "150px"}}>
                            <Link to={'/history'}>History</Link>
                        </Menu.Item>
                        
                        <div style={{display:"inline-block",float:"right",paddingRight:"30px"}}>
                             Welcome, {username}
                             <button onClick={this.handleLogOut} style={logOutBtnStyle}>Log Out</button>
                        </div>
                    </Menu>
                </Header>
                
                <header className="App-header">
                    
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div>
                        {/* Upload button*/}
                        <div>
                            <Upload
                                onChange={this.onChange}
                                beforeUpload={this.beforeUpload}
                                onDownload={() => this.onDownload("raw")}
                                onPreview={() => this.onDownload("raw")}
                                onRemove={this.onRemove}
                                {...props}>

                                <Button>
                                    <Icon type = 'upload' /> Click to Upload
                                </Button>

                            </Upload>
                        </div>
                        {/*Presenter/Student mode button*/}
                        <div style={{display:this.state.display_name}}>
                            <Link to={{pathname: '/presenter', query: this.state.data}} target = '_blank'>
                                <Button size={"median"} style={{marginRight: 10}}>
                                    Presenter mode
                                </Button>
                            </Link>
                            <Button size={"median"} style={{marginLeft: 10}}
                                    onClick={() => this.onDownload("HTML")}>
                                Download HTML
                            </Button>
                        </div>
                        {/*Start/Stop sharing file button*/}
                        <div style={{display:this.state.display_name}}>
                            <CopyToClipboard
                                onCopy={this.startSharing}
                                text={this.state.fileId}>
                                <Button size={"median"} style={{marginRight: 10}}>
                                    Start sharing
                                </Button>
                            </CopyToClipboard>
                            <Button size={"median"} style={{marginLeft: 10}}
                                    onClick={this.stopSharing}>
                                Stop sharing
                            </Button>
                        </div>
                    </div>

                </header>
            </div>
        )
    }
}

export default MyUpload;