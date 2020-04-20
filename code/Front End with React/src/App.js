import React, { Component } from "react";
import AppRouter from "./router/AppRouter"
import "./App.css";
import "antd/dist/antd.css";
import {BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // localStorage.setItem('isLogin', 0);
  }

  render() {
    return (
      <div className="App">    
          <AppRouter />
      </div>
    );
  }
}

export default App;
