import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import '../utils/index.css';
import {Link} from "react-router-dom";
import {List, Button, Skeleton, Menu, Layout, Icon} from 'antd';
import axios from "axios";
import {BASE_URL} from "../config/config";
import separateQuestion from "../components/Parse";
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
        // initLoading: true,
        // loading: false,
        fileList: [],
        MarkDownFile : "",
        data : "",
        fileId : ""
    };

    componentDidMount() {
        // this.getData(res => {
        //     this.setState({
        //         // initLoading: false,
        //         // data: res.results,
        //         data: demoData,
        //         list: demoData,
        //         // list: res.results,
        //     });
        // });
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
                // console.log(res.data);
            })
            .catch((error) => {
                console.log("error")
            });
    }

    fetchFile =(fileId)=> {
        let params = {
            fileId: fileId
        }

        axios.get(BASE_URL + "/fetch",  {params})
            .then(res => {
                console.log("AAA", res.data);
                this.setState({
                    MarkDownFile: res.data,
                }, this.callSeparateQuestion)
                console.log(this.state.MarkDownFile)
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
        console.log(this.state.MarkDownFile)
        console.log(fileId)
        const data = separateQuestion(this.state.MarkDownFile, fileId);
        console.log(data)
        localStorage.setItem("data",data)
        // this.jump();
        // this.getMarpit();
    }

    jump(){
        console.log('jump')
        const w=window.open('localhost:3000/presenter');
        w.location.href= 'localhost:3000/presenter'
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

                <div style={{padding: 45, paddingTop: 60}}>
                    {/*<List margin-top={"50px"}*/}
                    {/*      className="demo-loadmore-list"*/}
                    {/*      // loading={initLoading}*/}
                    {/*      itemLayout="horizontal"*/}
                    {/*    // loadMore={loadMore}*/}
                    {/*      dataSource={fileList}*/}
                    {/*      renderItem={item => (*/}
                    {/*          <List.Item*/}
                    {/*              actions={[*/}
                    {/*                  <Button key="list-loadmore-more">Student Mode</Button>,*/}
                    {/*                  <Button>Start sharing</Button>,*/}
                    {/*                  <Button>Stop sharing</Button>]}*/}
                    {/*          >*/}
                    {/*              /!*<Skeleton avatar title={false} loading={item.loading} active>*!/*/}
                    {/*                  <List.Item.Meta*/}
                    {/*                      title={[<a href="https://ant.design">{item.fileName}</a>, <Button > PM </Button>]}*/}
                    {/*                  />*/}
                    {/*                  /!*<div>content</div>*!/*/}
                    {/*              /!*</Skeleton>*!/*/}
                    {/*          </List.Item>*/}
                    {/*      )}*/}
                    {/*/>*/}
                    {fileList.map(item => <li key={item.fileId}>{item.fileName}
                        <button onClick={() => this.fetchFile(item.fileId)}>Presenter Mode</button>
                        {/*<button onClick={() => this.fetchFile(item.fileId)}>Presenter Mode</button>*/}
                    </li>)}
                </div>

            </div>

        );
    }
}

// render(<UploadHistory />, document.getElementById('container'));


export default UploadHistory;