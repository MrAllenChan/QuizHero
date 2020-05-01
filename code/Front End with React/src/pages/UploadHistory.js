import React from 'react';
import 'antd/dist/antd.css';
import '../App.css'
// import '../utils/index.css';
import {Link} from "react-router-dom";
import {List, Button, Menu, Layout, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../config/config";
import separateQuestion from "../components/Parse";
import {CopyToClipboard} from "react-copy-to-clipboard";
import marpitConvert from "../components/Marpit";
const {Header} = Layout;


class UploadHistory extends React.Component {
    state = {
        fileList: [],
        data : "",
        fileId : ""
    };

    componentDidMount() {
        let params = {
            instructorId : localStorage.getItem("instructorId")
        }
        console.log(params)
        axios
            .get(BASE_URL + "/history", {params})
            .then((res) => {
                if(res.status === 200){
                    this.setState({
                        fileList : res.data
                    });
                    console.log("res",res);
                    console.log(this.state.fileList);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    fetchFile =(fileId)=> {
        let params = {
            fileId: fileId
        }
        console.log(fileId)
        axios.get(BASE_URL + "/fetch",  {params})
            .then(res => {
                console.log("AAA", res.data);
                this.callSeparateQuestion(res.data);
                message.success(`File ${fileId} fetched successfully.`);
            })
            .catch((error) => {
                alert(`Fail to fetch File ${fileId}. ${error}`)
            })
    }

    callSeparateQuestion =(rawString)=>{
        var data = separateQuestion(rawString);
        data = JSON.stringify(data)
        localStorage.setItem("data", data)
        this.jump();
    }

    jump =()=> {
        console.log('jump')
        window.open('/presenter');
    }

    startSharing=(fileId)=>{
        const formData = new FormData();
        formData.append('fileId', fileId);
        formData.append('permission', true);
        axios.post(BASE_URL + "/filepermission", formData)
            .then(()=> message.success(`Share code ${fileId} is copied on your clipboard`))
            .catch((error)=> message.error(error));
    }

    stopSharing=(fileId)=>{
        const formData = new FormData();
        formData.append('fileId', fileId);
        formData.append('permission', false);
        axios.post(BASE_URL + "/filepermission", formData)
            .then(()=> message.success(`File ${fileId} stop sharing`))
            .catch((error)=> message.error(error));
    }

    onDownload = (fileId, fileName, fileType) => {
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

        let params = {
            fileId: fileId
        }
        console.log(fileId)
        axios.get(BASE_URL + "/fetch", {params})
            .then(res => {
                console.log("AAA", res.data);
                if (fileType === "raw") exportRaw(fileName, res.data);
                else if (fileType === "HTML") exportRaw(`${fileName}.html`, marpitConvert(res.data));
                message.success(`File ${fileName} downloaded successfully.`)
            })
            .catch((error) => {
                console.log(error);
                alert(`Fail to fetch File ${fileId}. ${error}`)
            })
    }

    deleteFile =(fileId)=> {
        const formData = new FormData();
        formData.append('fileId', fileId);
        axios.post(BASE_URL + "/deletefile", formData)
            .then(() => {
                this.componentDidMount();
                message.success(`File ${fileId} deleted successfully`)})
            .catch((error => {
                this.componentDidMount();
                alert(`Fail to delete File ${fileId}. ${error}`)
            }))
    }

    handleLogOut(){
        localStorage.setItem("username",null)
        localStorage.setItem("instructorId",0)
        localStorage.setItem("isLogin",0)
        localStorage.setItem("data", null)
        window.location = "/login"
    }

    render() {
        const { fileList } = this.state;

        const username = localStorage.getItem("username")?localStorage.getItem("username"):"";

        const logOutBtnStyle = {
            background: "none",
            border: "none",
            paddingLeft: "5px",
            color: "#1890FF",
            textDecoration: "underline",
            cursor: "pointer"
        };

        return (
            <div className="App">
                <Header style={{height: 0, padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="white" mode="horizontal" defaultSelectedKeys={['2']}>

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

                <div style={{padding: 45, paddingTop: 60}}>
                    <List margin-top={"50px"}
                          className="demo-loadmore-list"
                          itemLayout="horizontal"
                          dataSource={fileList}
                          renderItem={item => (
                              <List.Item
                                  actions={[
                                      <Button size={'small'}
                                              onClick={() => this.deleteFile(item.fileId)}>
                                          Delete
                                      </Button>,
                                      <Button size={"small"}
                                              onClick={() => this.fetchFile(item.fileId)}>
                                          Presenter Mode
                                      </Button>,
                                      // <Link to={{pathname: '/presenter'}} target = '_blank'>
                                      //     <Button size={"small"} style={{marginLeft: 10}}
                                      //             onClick={() => this.fetchFile(item.fileId)}>
                                      //         <Icon/>Presenter Mode
                                      //     </Button>
                                      // </Link>,
                                      // Start/Stop sharing file button
                                      <Button size={"small"}
                                              onClick={() => this.onDownload(item.fileId, item.fileName, "HTML")}>
                                          Download HTML
                                      </Button>,
                                      <CopyToClipboard text={item.fileId}
                                                       onCopy={() => this.startSharing(item.fileId)}>
                                          <Button size={"small"}>
                                              Start sharing
                                          </Button>
                                      </CopyToClipboard>,
                                      <Button size={"small"}
                                              onClick={() => this.stopSharing(item.fileId)}>
                                          Stop sharing
                                      </Button>
                                  ]}
                              >
                                  <List.Item.Meta style={{float:"left", marginLeft:"0px", width: "0px"}}
                                      title={<a onClick={() => this.onDownload(item.fileId, item.fileName, "raw")}>{item.fileName}</a>}
                                  />
                              </List.Item>
                          )}
                    />
                </div>

            </div>

        );
    }
}

export default UploadHistory;