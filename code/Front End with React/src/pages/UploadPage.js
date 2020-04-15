import { Upload, message, Button, Icon } from 'antd';
import React from "react";
import Marpit from '@marp-team/marpit'
import axios from 'axios';
import {BASE_URL} from "../config/config"
import {Link} from "react-router-dom"
import logo from "../fig/logo.png";

// const fs = require('fs');
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
};

// Marpit
const marpit = new Marpit();
// Add Marpit theme CSS
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


class MyUpload extends React.Component{
    constructor(props) {
        super(props);
        // this.beforeUpload.bind = this.beforeUpload.bind(this);
    }
    state = {
        file:"",
        fileId:"",
        result:"",
        rawString:"",
        slideString:"",
        quizString:"",
        quiz:[],
        display_name:'none',
        data:""
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
            this.readFile(this.state.file).then(this.convertText);
            // this.separateQuestion(this.state.rawString);
            // this.trans();
            this.state.display_name = this.display_name(this.state.display_name);

            // send markdown file to backend

            // const BASE_URL = "https://quiz-hero.herokuapp.com";
            // const BASE_URL = document.location.origin;
            // const formData = {
            //     userId : 1,
            //     file: this.state.file
            // }
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('userId', localStorage.getItem("instructorId"));
            console.log("Send data to backend", formData);
            axios.post(BASE_URL + "/upload", formData)
                .then(res => {
                        console.log("CCC",res.data);
                        this.setState({fileId : res.data.fileId})
                        alert("File uploaded successfully.")
                });
            
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

    onRemove = (file) => {
        this.state.display_name = this.display_name(this.state.display_name);
    }

    onDownload = (file) => {
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
        exportRaw('filename.html', this.state.result);
        console.log(this.state.rawString);

    }


    readFile=(file)=>{
        return new Promise(function (resolve, reject) {
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
    };

    convertText=(result)=> {
        // console.log(result);
        this.setState({
            rawString : result
        }, () => {this.separateQuestion(this.state.rawString);});
        // console.log(this.state.rawString);
        // 3. Render markdown
        const {html, css} = marpit.render(result);
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
            result: filestring
        },);
    }

    separateQuestion = (fileString) => {
        var slides = new Array();
        var questions = new Array();
        var data = fileString;
        var sections = data.split("---\n\n")
        for (var i = 0; i < sections.length; i++) {
            console.log(sections[i].split(" ", 2)[0] === ">");
            const section = sections[i].split(" ");
            console.log(section[0]);
            if (section[0] === ">") {
                questions.push(sections[i]);
            } else {
                slides.push(sections[i]);
            }
        }
        console.log(questions)
        this.setState({
            slideString: slides.join("---\n\n"),
            quizString: questions.join("---\n\n")
        }, this.trans)
    }

    parseString = (rawString) => {
        // this.separateQuestion(this.state.rawString);
        var quizList = new Array();
        var data = rawString;
        var quizzes = data.split("\n\n");
        var parsedChoice;

        for (var i = 0; i < quizzes.length; i++) {
            var choice = "A";
            var quiz = {
                question : "",
                answers : []
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
                            type : choice,
                            content : parsedChoice
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);

                        // send correct answer to backend
            
                        const formData = {
                            fileId : this.state.fileId,
                            questionId : quizList.length + 1,
                            answer : String.fromCharCode(charCode),
                            countA : 0,
                            countB : 0,
                            countC : 0,
                            countD : 0,
                        }
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
                            type : choice,
                            content : parsedChoice
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);
                    }
                }
            }
            quizList.push(quiz);
        }
        return quizList;
    };

    trans=()=>{
        // var obj = JSON.parse(this.state.rawString);
        // var questions = obj;
        // this.separateQuestion(this.state.rawString);
        console.log(this.state.quizString)
        console.log(this.state.slideString)
        var questions = this.parseString(this.state.quizString);
        console.log(questions);
        this.setState({
            quiz : questions
        });
        const slidesString = this.state.slideString;
        const fileId = this.state.fileId;
        var data = {
            quiz: questions,
            slidesString: slidesString,
            fileId: fileId
        }
        // data = JSON.stringify(data);
        // var path = `/presenter/${data}`;
        this.setState({
            data: data
        })
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