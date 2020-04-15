import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import QuizStatictic from './QuizStatistic'
import BackButton from './Button'

function ResultStudent(props) {
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
                    Thank you for finishing the quiz, please go back to the slides.
                </div>
            </CSSTransitionGroup>
            <BackButton toSlidesCallback={props.toSlidesCallback}/>
        </div>
    );
}

ResultStudent.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default ResultStudent;
