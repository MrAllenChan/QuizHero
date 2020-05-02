/**
 * The ResultPresenter component is to show instructor the result chart of quiz
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import QuizStatictic from './quiz_components/QuizStatistic'
import BackButton from './quiz_components/Button'

/**
 * The function ResultPresenter is to render statistic data and back button
 * @param props
 * @returns {*}
 * @constructor
 */
function ResultPresenter(props) {
    return (
        <div>
            <CSSTransitionGroup
                className="container result"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}
            >
            <div>
                Thank you for finishing the quiz, here are the statistics:
            </div>
            </CSSTransitionGroup>
            <QuizStatictic fileId = {props.fileId}/>
            <BackButton toSlidesCallback={props.toSlidesCallback}/>
        </div>
    );
}

ResultPresenter.propTypes = {
    // quizResult: PropTypes.string.isRequired
};

export default ResultPresenter;
