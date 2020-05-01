/**
 * The QuestionCount component is to record the number of question
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * The QuestionCount is to render the number of each question.
 * @param props
 * @returns {*}
 * @constructor
 */
function QuestionCount(props) {
    return (
        <div className="questionCount">
            Question <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

QuestionCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default QuestionCount;
