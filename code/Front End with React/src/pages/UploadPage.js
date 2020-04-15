import { Upload, message, Button, Icon, Layout, Menu} from 'antd';
import React from "react";
import Marpit from '@marp-team/marpit'
import axios from 'axios';
import {BASE_URL} from "../config/config"
import {Link} from "react-router-dom"
import logo from "../fig/logo.png";
import {func} from "prop-types";
import {enableTopologicalTravel} from "echarts/src/util/component";
 const { Header, Content, Footer } = Layout;

// const fs = require('fs');
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
        // this.beforeUpload.bind = this.beforeUpload.bind(this);
    }
    state = {
        file:"",
        fileId:"",
        rawString:"",
        slideStringList:[],
        quizStringList:[],
        data:"",
        marpitResult:"",
        display_name:'none'
    }


    beforeUpload = (file) => {
        console.log("FILEEE",file);
        this.setState({
            file:file
        });
    }
    onChange = (info) => {
        // console.log("file!!!:",info.file)

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            // this.convertFile();
            console.log(info.file.name);
            message.success(`${info.file.name} file uploaded successfully`);
            this.sendFile()
                .then(this.readFile)
                .then(this.separateQuestion);
            // this.sendFile()
            //     .then(this.trans);
            // this.readFile()
            //     .then(this.convertText);

            this.state.display_name = this.display_name();

            // send markdown file to backend

            // const BASE_URL = "https://quiz-hero.herokuapp.com";
            // const BASE_URL = document.location.origin;
            // const formData = {
            //     userId : 1,
            //     file: this.state.file
            // }
            // axios
            //     .post(BASE_URL + "/upload", formData, {
            //         headers: {
            //             "Content-Type": "multipart/form-data"
            //         }
            //     })
            //     .then(() => {
            //         console.log("upload success");
            //     })
            //     .catch((error) => {
            //         console.log("error")
            //     });
        } else if (info.file.status === 'error') {
            console.log(info.file.name);
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onRemove = () => {
        this.state.display_name = this.display_name();
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
        exportRaw('filename.html', this.state.marpitResult);
        console.log(this.state.rawString);

    }

    // send markdown file to backend and pass the database fileId to readFile
    sendFile =() => {
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
                    alert("File uploaded successfully.");
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return p;
    }

    readFile=(fileId)=>{
        this.setState({fileId : fileId});
        console.log(fileId);
        var file = this.state.file;
        var p = new Promise(function (resolve, reject) {
            const reader = new FileReader();
            console.log("1");
            reader.readAsText(file);
            console.log("2")
            reader.onload = (e) => {
                // let content = e.target.result;
                resolve(reader.result);
                console.log("3");
                // console.log(content);
            };
            reader.onerror = function (e) {
                reject(e);
            };
        });
        return p;
    }

    separateQuestion = (result) => {

        this.setState({
            rawString : result
        });

    //     var slides = new Array();
    //     var questions = new Array();
    //     // var data = this.state.rawString;
    //     var sections = result.split("---\n\n")
    // onPreview=(file)=>{
    //     this.separateQuestion(this.state.rawString);
    // }

    // rawstring分成slide array 和 question array,
    // 赋值给slideStringList, quizStringList
    // separateQuestion = (fileString) => {
        console.log("this is fileString/rawString:")
        // console.log(fileString)

        var slides = new Array(100);
        var questions = new Array(100);
        for (var i = 0; i < 100; i ++) {
            slides[i] = new Array();
            questions[i] = new Array();
        }


        // var data = fileString;
        var sections = result.split("---\n\n")  // => section[]

        var index = 0;
        for (var i = 0; i < sections.length; i++) {

            const section = sections[i].split(" ");
            if (section[0] === ">") {
                questions[index].push(sections[i]);
                slides[index].push("$$$quiz$$$\n\n");

                console.log(index);
                console.log(questions[index]);
                index ++;
            } else {
                slides[index].push(sections[i])
            }
        }
        var i = 0;
        var slideString = new Array();
        var quizString = new Array();
        while (slides[i] != "") {
            slideString[i] = slides[i].join("---\n\n");
            if (questions[i] != "") {
                quizString[i] = questions[i].join("---\n\n");
            }
            i ++;
        }
        console.log(slideString);
        console.log(quizString);

        this.setState({
            slideStringList: slideString,
            quizStringList: quizString

        }, this.trans)
    }

    trans=()=>{
        // var obj = JSON.parse(this.state.rawString);
        // var questions = obj;
        // this.separateQuestion(this.state.rawString);
        console.log(this.state.quizString)
        console.log(this.state.slideString)
        var questions = this.parseQuiz();
        var data = {
            quiz: questions,
            slidesString: this.state.slideString,
            fileId: this.state.fileId
        }
        // data = JSON.stringify(data);
        // var path = `/presenter/${data}`;
        this.setState({
            data: data
        }, this.marpitConvert)
    };

    // Marpit for download
    marpitConvert=()=> {
        // this.setState({
        //     rawString : result
        // }, () => {this.separateQuestion();});
        // 1. Marpit
        const marpit = new Marpit();
        // 2. Add Marpit theme CSS
        const theme = `
            /* @theme example */

            section {
              background-color: #369;
              color: #fff;
              font-size: 30px;
              padding: 40px;
            }

        h1,
        h2 {
          text-align: center;
          margin: 0;
        }

        h1 {
          color: #8cf;
        }
        `
        marpit.themeSet.default = marpit.themeSet.add(theme)
        // 3. Render markdown
        const {html, css} = marpit.render(this.state.rawString);
        // 4. Use output in your HTML
        let filestring = `
            <!DOCTYPE html>
            <html><body>
              <style>${css}</style>
              ${html}
            </body></html>
            `
            // console.log(filestring)
        ;
        this.setState({
            marpitResult: filestring
        });
    }

    //question变成quizLists(quiz, quizBlock, quizLists)
    parseQuiz = () => {
        // this.separateQuestion(this.state.rawString);
        // var quizList = new Array();
        // var data = this.state.quizString;
        // var quizzes = data.split("\n\n");
        // var parsedChoice;
        console.log(this.state.quizStringList);
        console.log(this.state.quizStringList.length);
        var length = this.state.quizStringList.length;
        var quizLists = new Array();
        // for(var i = 0; i < length; i ++) {
        //     quizLists[i]=new Array();
        // }
        console.log(length);
        var count = 1;
        for (var index = 0; index < length; index ++) {
            var data = this.state.quizStringList[index];
            console.log(index);
            console.log(this.state.quizStringList[index]);
            var quizzes = data.split("\n\n");
            if (quizzes[quizzes.length - 1] == "") {
                quizzes.splice(quizzes.length - 1, 1);
            }
            console.log(quizzes);
            var parsedChoice;
            var quizBlock = new Array();
            console.log(quizBlock);

            for (var i = 0; i < quizzes.length; i++) {
                var choice = "A";
                var quiz = {
                    question: "",
                    answers: []
                };
                var quizArray = quizzes[i].split("\n");
                for (var j = 0; j < quizArray.length; j++) {
                    var line = quizArray[j];
                    if (line.length > 1) {
                        console.log(line)
                        if (line.slice(0, 11) === "> Question:") {
                            // parse question
                            quiz.question = line.slice(12, line.length);
                            // quiz.question = parsedQuestion.join(" ");
                        } else if (line[0] === '*' && line.slice(2, 5) === "[x]") {
                            // parse correct choice
                            parsedChoice = line.slice(6, line.length);
                            // parsedChoice = parsedChoice.join(" ");
                            quiz.answers.push({
                                type: choice,
                                content: parsedChoice
                            });
                            var charCode = choice.charCodeAt(0);
                            choice = String.fromCharCode(charCode + 1);

                            // send correct answer to backend

                            const formData = {
                                fileId: this.state.fileId,
                                // questionId : quizBlock.length + 1,
                                questionId: count,
                                answer: String.fromCharCode(charCode),
                                countA: 0,
                                countB: 0,
                                countC: 0,
                                countD: 0,
                            }
                            count++;
                            console.log(formData)
                            axios
                                .post(BASE_URL + "/quiz", formData, {
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                })
                                .then(res => {
                                    console.log("quiz initialize success");
                                })
                                .catch((error) => {
                                    console.log("error")
                                });
                        } else if (line[0] === '*' && line.slice(2, 5) === "[ ]") {
                            // parse wrong choice
                            parsedChoice = line.slice(6, line.length);
                            // parsedChoice = parsedChoice.join(" ");
                            quiz.answers.push({
                                type: choice,
                                content: parsedChoice
                            });
                            var charCode = choice.charCodeAt(0);
                            choice = String.fromCharCode(charCode + 1);
                        }
                    }
                }
                quizBlock.push(quiz);
            }
            quizLists.push(quizBlock);
            console.log(quizLists)
        }
        console.log(quizLists);
        return quizLists;
    };

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


    render(){
        return(
            <div className="App">
                <Header style={{height: 0, padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="white" mode="horizontal" defaultSelectedKeys={['1']}>

                        {/*<Menu.Item key="1">Upload </Menu.Item>*/}

                        {/*<Menu.Item key="2">History </Menu.Item>*/}
                        <Menu.Item key="1">
                            <Link to={'/HomePage'}>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/history'}>History</Link>
                        </Menu.Item>

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
                                onDownload={this.onDownload}
                                onPreview={this.onPreview}
                                onRemove={this.onRemove}
                                {...props}>

                                <Button>
                                    <Icon type = 'upload' /> Click to Upload
                                </Button>

                            </Upload>
                        </div>
                        {/*Presenter/Student mode button*/}
                        <div style={{display:this.state.display_name}}>
                            <Link to={{pathname: '/presenter', query: this.state.data}}>
                                <Button size={"large"} style={{marginRight: 10}}>
                                    <Icon/>Presenter mode
                                </Button>
                            </Link>
                            <Link to={{pathname: '/student', query: this.state.data}}>
                                <Button size={"large"} style={{marginLeft: 10}}>
                                    <Icon/>Student mode
                                </Button>
                            </Link>
                        </div>
                    </div>

                </header>
            </div>
        )
    }
}

export default MyUpload;