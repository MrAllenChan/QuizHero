import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../App.css'
// import '../utils/index.css';
import {Link} from "react-router-dom";
import {List, Button, Skeleton, Menu, Layout, Icon, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../config/config";
import separateQuestion from "../components/Parse";
import {CopyToClipboard} from "react-copy-to-clipboard";
import template from "../components/template";
// import marpitConvert from "../components/Marpit";
const { Header, Content, Footer } = Layout;


const demoData = [
    {title : 'demo.md'},
    {title : 'presentation.md'},
    {title : 'oose.md'},
    {title : 'design pattern .md'}
]

class UploadHistory extends React.Component {
    state = {
        fileList: [],
        MarkDownFile : "",
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
                this.setState({
                    MarkDownFile: res.data,
                })
                this.callSeparateQuestion();
                message.success(`File ${fileId} fetched successfully.`);
            })
            .catch((error) => {
                alert(`Fail to fetch File ${fileId}. ${error}`)
            })
    }

    callSeparateQuestion =()=>{
        var data = separateQuestion(this.state.MarkDownFile);
        data = JSON.stringify(data)
        localStorage.setItem("data", data)
        this.jump();
        // this.getMarpit();
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

    onDownload = (fileId, fileName) => {
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
                exportRaw(fileName, res.data);
                message.success(`File ${fileName} ${fileId} downloaded successfully.`)
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
            .then(() => {this.componentDidMount();
            message.success(`File ${fileId} deleted successfully`)})
            .catch((error => {
                this.componentDidMount();
                alert(`Fail to delete File ${fileId}. ${error}`)
            }))
        // this.componentDidMount();
    }

    // getData = callback => {
        // reqwest({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: res => {
        //         callback(res);
        //     },
        // });
    // };

    // onLoadMore = () => {
    //     this.setState({
    //         loading: true,
    //         list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    //     });
    //     this.getData(res => {
    //         const data = this.state.data.concat(res.results);
    //         this.setState(
    //             {
    //                 data,
    //                 list: data,
    //                 loading: false,
    //             },
    //             () => {
    //                 // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    //                 // In real scene, you can using public method of react-virtualized:
    //                 // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //                 window.dispatchEvent(new Event('resize'));
    //             },
    //         );
    //     });
    // };

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
                                      <CopyToClipboard
                                          onCopy={() => this.startSharing(item.fileId)}
                                          text={item.fileId}>
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
                                  {/*<Skeleton avatar title={false} loading={item.loading} active>*/}
                                  <List.Item.Meta style={{float:"left", marginLeft:"0px", width: "0px"}}
                                      title={<a onClick={() => this.onDownload(item.fileId, item.fileName)}>{item.fileName}</a>}
                                  />
                                      {/*<div>content</div>*/}
                                  {/*</Skeleton>*/}
                              </List.Item>
                          )}
                    />
                </div>

            </div>

        );
    }
}

export default UploadHistory;