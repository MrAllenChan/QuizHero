import React, { Component } from "react";
import AppRouter from "./router/AppRouter"
import "./App.css";
import "antd/dist/antd.css";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
