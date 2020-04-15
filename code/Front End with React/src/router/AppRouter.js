// src/router/router.js
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getUserLoginStatus from '../utils/getUserLoginStatus';
import { connect } from "react-redux";


const history = createBrowserHistory();

const mapStateToProps = state =>{
  return{
    instructorId: state.setUserName.instructorId
  }
}

const requireLogin = (to, from, next) => {
  if (this.props.instructorId !== 0) {
    // next();
    next.redirect("/HomePage");
  }
  next.redirect("/login");
};

class AppRouter extends Component {
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
              <GuardedRoute path="/HomePage" exact component={HomePage} />
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


export default connect(mapStateToProps)(AppRouter)