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
import MyUpload from "../pages/UploadPage";
import PresentPage from '../pages/PresentPage'
import StudentPage from "../pages/StudentPage";
import uploadHistory from "../pages/uploadHistory"
import StudentRequestPage from "../pages/StudentRequestPage";

const history = createBrowserHistory();

const mapStateToProps = state =>{
  return{
    instructorId: state.setUserName.instructorId
  }
}

const requireLogin = (to, from, next) => {
  console.log("Checking")
  // setTimeout(() => {  console.log("Checking"); }, 8000);
  if (true) {
    // if (false) {
    console.log("Checking passsssssssssss")
    // next.redirect("/HomePage");
  }
  next.redirect("/login");
};

class AppRouter extends Component {

  componentWillReceiveProps(nextProps){
    //invoke function with updated store
    //this.foo(nextProps)
      console.log("last1",this.props.instructorId); // prevProps
      console.log("now1",nextProps.instructorId); // currentProps after updating the store
    }




  render() {
    const {instructorId} = this.props;
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
            {/* <GuardProvider guards={[requireLogin]}> */}
            <GuardProvider>
              <GuardedRoute path="/" exact render={() => <Redirect to="/login" />} />
              <GuardedRoute path="/StudentRequestPage" exact component={StudentRequestPage} />
              <GuardedRoute path="/HomePage" exact component={MyUpload} />
              <GuardedRoute path="/presenter" component={PresentPage}/>
              <GuardedRoute path="/student" component={StudentPage}/>
              <GuardedRoute path="/history" component={uploadHistory}/>
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