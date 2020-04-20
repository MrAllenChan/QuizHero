import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import '../utils/index.css';
import {Link} from "react-router-dom";
import {List, Button, Skeleton, Menu, Layout} from 'antd';
import axios from "axios";
import {BASE_URL} from "../config/config";
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
        fileId: [],
        fileName: [],
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
            .get(BASE_URL + "/getInstructorFile", {params})
            .then((res) => {
                if(res.status === 200){
                    this.setState({
                        fileId : res.data.fileId,
                        fileName : res.data.fileName
                    });
                    console.log("res",res);
                }
                // console.log(res.data);
            })
            .catch((error) => {
                console.log("error")
            });
    }

    getData = callback => {
        // reqwest({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: res => {
        //         callback(res);
        //     },
        // });
    };

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
        const { initLoading, loading, list } = this.state;

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
                    <List margin-top={"50px"}
                          className="demo-loadmore-list"
                          loading={initLoading}
                          itemLayout="horizontal"
                        // loadMore={loadMore}
                          dataSource={list}
                          renderItem={item => (
                              <List.Item
                                  actions={[<a key="list-loadmore-edit">View</a>, <a key="list-loadmore-more">Download</a>]}
                              >
                                  <Skeleton avatar title={false} loading={item.loading} active>
                                      <List.Item.Meta
                                          title={<a href="https://ant.design">{item.title}</a>}
                                      />
                                      {/*<div>content</div>*/}
                                  </Skeleton>
                              </List.Item>
                          )}
                    />
                </div>

            </div>

        );
    }
}

// render(<UploadHistory />, document.getElementById('container'));


export default UploadHistory;