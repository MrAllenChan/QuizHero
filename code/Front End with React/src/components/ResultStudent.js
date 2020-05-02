/**
 * The ResultStudent component is to show student the end page of quiz.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import BackButton from './quiz_components/Button'

/**
 * The ResultStudent function is to inform students that the quiz has been finished
 * @param props
 * @returns {*}
 * @constructor
 */
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
