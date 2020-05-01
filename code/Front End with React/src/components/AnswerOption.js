/**
 * The AnswerOption component is to render answer options for each question.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render answer options for questions.
 * @param props
 * @returns {*}
 * @constructor
 */
function AnswerOption(props) {
    return (
        <li className="answerOption">
            <input
                type="radio"
                className="radioCustomButton"
                name="radioGroup"
                checked={props.answerType === props.answer}
                id={props.answerType}
                value={props.answerType+" "+props.questionCounter+" "+props.answerContent}
                disabled={props.answer}
                onChange={props.onAnswerSelected}
            />
            <label className="radioCustomLabel" htmlFor={props.answerType}>
                {props.answerContent}
            </label>
        </li>
    );
}

/**
 * Set the types of AnswerOption
 * @type {{answerContent: Validator<NonNullable<string>>, answer: Validator<NonNullable<string>>, answerType: Validator<NonNullable<string>>, onAnswerSelected: Validator<NonNullable<(...args: any[]) => any>>}}
 */
AnswerOption.propTypes = {
    answerType: PropTypes.string.isRequired,
    answerContent: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
