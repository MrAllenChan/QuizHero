import React, { Component } from "react";
import HomePage from "./pages/HomePage";
import AppRouter from "./router/AppRouter"
import "./App.css";
import "antd/dist/antd.css";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";

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
