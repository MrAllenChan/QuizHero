import { Upload, message, Button, Icon } from 'antd';
import React from "react";
import Marpit from '@marp-team/marpit'
import axios from 'axios';
// import axios from 'axios'
import { Box, Deck, FlexBox, FullScreen, Markdown, Progress, Slide, Heading } from 'spectacle';


// const fs = require('fs');
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },


};

// SPECTACLE_CLI_THEME_START
const theme_s = {};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
    <FlexBox
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width={1}
    >
        <Box padding="0 1em">
            <FullScreen />
        </Box>
        <Box padding="1em">
            <Progress />
        </Box>
    </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

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
        this.callback = props.callback;
        this.callback1 = props.callback1;
        // this.beforeUpload.bind = this.beforeUpload.bind(this);

    }
    state = {
        file:"",
        result:"",
        rawString:"",
        slideString:"",
        quizString:"",
        quiz:[]
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
            // this.trans();
        } else if (info.file.status === 'error') {
            console.log(info.file.name);
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onDownload = (file) => {
        // const BASE_URL = document.location.origin;

        // const formData = {
        //     fileContent: { file },
        //     userName: 'admin'
        // }
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
        // const formData = {
        //     fileId : 1,
        //     questionId : 1,
        //     choice : 2
        // }
        // axios
        //     .post(BASE_URL+"/record", formData, {
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
    }

    onPreview=(file)=>{
        this.separateQuestion(this.state.rawString);
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
        });
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

        for (var i = 0; i < quizzes.length; i++) {
            var choice = "A";
            var quiz = {
                question : "",
                answers : []
            };
            var quizArray = quizzes[i].split("\n");
            for (var j = 0; j < quizArray.length; j++) {
                var line = quizArray[j].split(" ");
                if (line.length > 1) {
                    console.log(line)
                    if (line[1]==="Question:") {
                        // parse question
                        var parsedQuestion = line.slice(2, line.length);
                        quiz.question = parsedQuestion.join(" ");
                    } else if (line[1].charAt(0) === '*') {
                        // parse correct answers
                        quiz.answers.push({
                            type : choice,
                            content : line[1].substring(2, line[1].length - 2)
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);

                        // send correct answer to backend
                        const BASE_URL = document.location.origin;
                        const formData = {
                            fileId : 1,
                            questionId : quizList.length + 1,
                            answer : String.fromCharCode(charCode),
                            countA : 0,
                            countB : 0,
                            countC : 0,
                            countD : 0,
                        }
                        console.log(formData)
                        axios
                            .post(BASE_URL+"/quiz", formData, {
                                headers: {
                                "Content-Type": "multipart/form-data"
                                }
                            })
                            .then(() => {
                                console.log("quiz initialize success");
                            })
                            .catch((error) => {
                                 console.log("error")
                            });

                    } else {
                        // parse wrong answers
                        quiz.answers.push({
                            type : choice,
                            content : line[1]
                        });
                        var charCode = choice.charCodeAt(0);
                        choice = String.fromCharCode(charCode + 1);
                    }
                }
            }
            quizList.push(quiz);
        }
        return quizList;
        // for (var i = 0; i < data.length(); i ++) {
        //     var j = i;
        //     var quiz = {};
        //     if (data.charAt(i) == '$') {
        //         j = i + 1;
        //         i = j;
        //         while (data.charAt(j) != '$') {
        //             j ++;
        //         }
        //         var question = data.substring(i, j);
        //         j = j + 1;
        //         i = j;
        //         quiz["question"] = question;
        //     }
        //     var answers = [];
        //     while (data.charAt(j) != '$' || data.length() == j) {
        //         var answer = {};
        //         i = i + 1;
        //         j = j + 1;
        //         answer["type"] = data.charAt(i);
        //         while (data.charAt(j) != '@' || data.charAt(j) != '$' || data.length() == j) {
        //             j ++;
        //         }
        //         var content = data.substring(i + 1, j);
        //         answer["content"] = content;
        //         i = j;
        //         answers.push(answer);
        //     }
        //     quiz["answers"] = answers;
        //     quizList.push(quiz);
        // }
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
        this.props.callback(questions);
        this.props.callback1(slidesString);
    };


    render(){
        return(
            <div>
                <Upload
                    onChange={this.onChange}
                    beforeUpload={this.beforeUpload}
                    onDownload={this.onDownload}
                    onPreview={this.onPreview}
                    {...props}>

                    <Button>
                        <Icon type = 'upload' /> Click to Upload
                    </Button>

                </Upload>

            </div>
        )
    }
}

export default MyUpload;