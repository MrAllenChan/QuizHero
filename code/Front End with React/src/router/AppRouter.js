// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import HomePage from '../pages/HomePage'


export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/HomePage" />)} />
        <Route path="/HomePage" component={HomePage} />
        {/* <Route path="/RecordPersonTable" component={RecordPersonTable} />
        <Route path="/AttendanceTable" component={AttendanceTable} /> */}
      </Switch>
    )
  }
} 