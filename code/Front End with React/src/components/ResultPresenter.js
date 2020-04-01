import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import QuizStatictic from './QuizStatistic'
import BackButton from './Button'

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
                {/* Thank you for taking the quiz, your score is <strong>{props.quizResult}</strong>! */}
                Thank you for finishing the quiz, here are the statistics:
            </div>
            </CSSTransitionGroup>
            <QuizStatictic/>
            <BackButton callback3={props.callback3}/>
        </div>
    );
}

ResultPresenter.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default ResultPresenter;
