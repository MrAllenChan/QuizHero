// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
// import HomePage from '../pages/HomePage'
import MyUpload from "../pages/UploadPage";
import PresentPage from '../pages/PresentPage'
import StudentPage from "../pages/StudentPage";

export default class AppRouter extends Component {


    render() {
        return(
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/HomePage" />)} />
            <Route path="/HomePage" component={MyUpload} />
            <Route path="/presenter" component={PresentPage}/>
            <Route path="/student" component={StudentPage}/>
          </Switch>
        )
    }
} 