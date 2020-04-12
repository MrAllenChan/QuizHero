// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import HomePage from '../pages/HomePage'
import QuizPagePresenter from '../components/QuizPagePresenter'
import QuizPageStudent from "../components/QuizPageStudent";

export default class AppRouter extends Component {


    render() {
        return(
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/HomePage" />)} />
            <Route path="/HomePage" component={HomePage} />
            {/*           // quizCallback={this.quizCallback}*/}
            {/*           //                        slidesCallback={this.slidesCallback}*/}
            {/*           //                        quiz={this.state.quiz}*/}
            {/*           //                        slidesString={this.state.slidesString}/>}*/}
            {/*/>*/}
            <Route path="/presenter" component={QuizPagePresenter}/>
            <Route path="/student" component={QuizPageStudent}/>
            {/* <Route path="/RecordPersonTable" component={RecordPersonTable} />
            <Route path="/AttendanceTable" component={AttendanceTable} /> */}
          </Switch>
        )
    }
} 