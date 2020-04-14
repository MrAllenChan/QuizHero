// src/router/router.js
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getUserLoginStatus from '../utils/getUserLoginStatus';
import MyUpload from "../pages/UploadPage";
import PresentPage from '../pages/PresentPage'
import StudentPage from "../pages/StudentPage";


const history = createBrowserHistory();

const requireLogin = (to, from, next) => {
  if (getUserLoginStatus()) {
    next();
  }
  next.redirect("/login");
};

export default class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route history={history}>
          <GuardProvider>
            <GuardedRoute
              path="/login"
              exact
              component={LoginPage}
            ></GuardedRoute>
            <GuardedRoute
              path="/register"
              exact
              component={RegisterPage}
            ></GuardedRoute>
            <GuardProvider guards={[requireLogin]}>
              <GuardedRoute path="/" exact render={() => <Redirect to="/HomePage" />} />
              <GuardedRoute path="/HomePage/:username/:instructorId" exact component={MyUpload} />
              <GuardedRoute path="/presenter" component={PresentPage}/>
              <GuardedRoute path="/student" component={StudentPage}/>
            </GuardProvider>
            {/* <Route path="/" exact render={() => <Redirect to="/HomePage" />} /> */}
            {/* <Route path="/RecordPersonTable" component={RecordPersonTable} />
            <Route path="/AttendanceTable" component={AttendanceTable} /> */}
          </GuardProvider>
        </Route>
      </Switch>
    );
  }
}
