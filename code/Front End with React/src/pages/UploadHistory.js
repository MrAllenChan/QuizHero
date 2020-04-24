import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import '../utils/index.css';
import {Link} from "react-router-dom";
import {List, Button, Skeleton, Menu, Layout, Icon, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../config/config";
import separateQuestion from "../components/Parse";
import {CopyToClipboard} from "react-copy-to-clipboard";
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
                this.callSeparateQuestion(fileId)
                alert(`File ${fileId} fetched successfully.`)
            })
            .catch((error) => {
                alert(`Fail to fetch File ${fileId}.`)
            })
    }

    generateSlides = (fileId) => {
        this.callSeparateQuestion(fileId);
        // this.state.display_name = this.display_name();
    }

    callSeparateQuestion =(fileId)=>{
        var data = separateQuestion(this.state.MarkDownFile, fileId);
        data = JSON.stringify(data)
        localStorage.setItem("data", data)
        this.jump();
        // this.getMarpit();
    }

    jump =()=> {
        console.log('jump')
        const w=window.open('about:blank');
        w.location.href= 'localhost:3000/presenter'
    }

    startSharing=(fileId)=>{
        const formData = new FormData();
        formData.append('fileId', fileId);
        formData.append('permission', true);
        axios.post(BASE_URL + "/quizpermission", formData)
            .then(()=> message.success(`Share code ${fileId} is copied on your clipboard`))
            .catch(()=> message.error('error'));
    }

    stopSharing=(fileId)=>{
        const formData = new FormData();
        formData.append('fileId', fileId);
        formData.append('permission', false);
        axios.post(BASE_URL + "/quizpermission", formData)
            .then(()=> message.success(`File ${fileId} stop sharing`))
            .catch(()=> message.error('error'));
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

    render() {
        const { fileList } = this.state;

        return (
            <div className="App">
                <Header style={{height: 0, padding: 0, position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="white" mode="horizontal" defaultSelectedKeys={['2']}>

                        <Menu.Item key="1">
                            <Link to={'/HomePage'}>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/history'}>History</Link>
                        </Menu.Item>

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
                                      <Button size={"small"} onClick={() => this.fetchFile(item.fileId)}>Fetch</Button>,
                                      <Link to={{pathname: '/presenter'}}>
                                          <Button size={"small"} style={{marginLeft: 10}}
                                                  onClick={() => this.fetchFile(item.fileId)}>
                                              <Icon/>Presenter Mode
                                          </Button>
                                      </Link>,
                                      // Start/Stop sharing file button
                                      <CopyToClipboard
                                          onCopy={() => this.startSharing(item.fileId)}
                                          text={item.fileId}>
                                          <Button size={"small"} style={{marginLeft: 10}}>
                                              <Icon/>Start sharing
                                          </Button>
                                      </CopyToClipboard>,
                                      <Button size={"small"} style={{marginLeft: 10}}
                                              onClick={() => this.stopSharing(item.fileId)}>
                                          <Icon/>Stop sharing
                                      </Button>
                                  ]}
                              >
                                  {/*<Skeleton avatar title={false} loading={item.loading} active>*/}
                                  <List.Item.Meta
                                      title={<a href="https://ant.design">{item.fileName}</a>}
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