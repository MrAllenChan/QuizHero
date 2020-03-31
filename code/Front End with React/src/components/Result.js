import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import QuizStatictic from './QuizStatistic'

function Result(props) {
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
                {/* Thank you for taking the quiz, your score is <strong>{props.quizResult}</strong>! */}
                Thank you for finishing the quiz, here is the statistics:
            </div>
        </CSSTransitionGroup>
        <QuizStatictic/>
        </div>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;
