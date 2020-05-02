/**
 * AppRouter route the application between different pages.
 * It is a combination of PublicRouter (do not require login) and PrivateRouter (require login)
 */

import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";
import FirstPage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { connect } from "react-redux";
import MyUpload from "../pages/UploadPage";
import PresentPage from '../pages/PresentPage'
import StudentPage from "../pages/StudentPage";
import StudentRequestPage from "../pages/StudentRequestPage";
import UploadHistory from "../pages/UploadHistory"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

const history = createBrowserHistory();

/**
 * Map the state from reducer to the props of the component
 * to get the data from the store
 *
 * @param {object}  state from reducer
 */
const mapStateToProps = state =>{
  return{
    instructorId: state.setUserName.instructorId
  }
}

/**
 * Frontend Router Component
 *
 */
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
     
    );
  }
}

export default connect(mapStateToProps)(AppRouter)