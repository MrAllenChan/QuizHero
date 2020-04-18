// src/router/router.js
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Switch, Route, Redirec, Router } from "react-router-dom";
import FirstPage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import getUserLoginStatus from '../utils/getUserLoginStatus';
import { connect } from "react-redux";
import MyUpload from "../pages/UploadPage";
import PresentPage from '../pages/PresentPage'
import StudentPage from "../pages/StudentPage";
import StudentRequestPage from "../pages/StudentRequestPage";
import UploadHistory from "../pages/UploadHistory"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

const history = createBrowserHistory();

const mapStateToProps = state =>{
  return{
    instructorId: state.setUserName.instructorId
  }
}

class AppRouter extends Component {


  render() {
    const {instructorId} = this.props;
    return (
      <Router history={history}>
      <Switch>
          <PublicRoute restricted={false} component={FirstPage} path="/" exact />
          <PublicRoute restricted={false} component={LoginPage} path="/login" exact />
          <PublicRoute restricted={false} component={RegisterPage} path="/register" exact />
          <PublicRoute restricted={false} component={StudentRequestPage} path="/StudentRequestPage" exact />
          <PublicRoute restricted={false} component={StudentPage} path="/student" exact />
          <PrivateRoute component={MyUpload} path="/HomePage" exact />
          <PrivateRoute component={PresentPage} path="/presenter" exact />
          <PrivateRoute component={UploadHistory} path="/history" exact />
      </Switch>
      </Router>


        // <Route>
        //   <GuardProvider>
        //     <GuardedRoute path="/" exact render={() => <Redirect to="/FirstPage" />} />
        //     <GuardedRoute
        //       path="/login"
        //       component={LoginPage}
        //     ></GuardedRoute>
        //     <GuardedRoute
        //       path="/register"
        //       component={RegisterPage}
        //     ></GuardedRoute>
        //     <GuardedRoute
        //         path="/FirstPage"
        //         exact
        //         component={FirstPage}
        //     ></GuardedRoute>
        //     <GuardedRoute path="/StudentRequestPage" exact component={StudentRequestPage} />
        //     {/* <GuardProvider guards={[requireLogin]}> */}
        //     <GuardProvider>
        //       <GuardedRoute path="/HomePage" component={MyUpload} />
        //       <GuardedRoute path="/presenter" component={PresentPage}/>
        //       <GuardedRoute path="/student" component={StudentPage}/>
        //       <GuardedRoute path="/history" component={UploadHistory}/>
            // </GuardProvider>
            // {/* <Route path="/" exact render={() => <Redirect to="/HomePage" />} /> */}
            // {/* <Route path="/RecordPersonTable" component={RecordPersonTable} />
            // <Route path="/AttendanceTable" component={AttendanceTable} /> */}
        //   </GuardProvider>
        // </Route>
     
    );
  }
}


export default connect(mapStateToProps)(AppRouter)