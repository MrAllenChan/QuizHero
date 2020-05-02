import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from './quiz_components/Question';
import QuestionCount from './quiz_components/QuestionCount';
import AnswerOption from './quiz_components/AnswerOption';

/**
 * The Quiz function is to render each question including number of question, problem and answer options.
 * @param props
 * @returns {*}
 * @constructor
 */
function Quiz(props) {
    /**
     * The renderAnswerOptions is to render answer options for each problem.
     * @param key
     * @returns {*}
     */
    function renderAnswerOptions(key) {
        return (
            <AnswerOption
                key={key.content}
                answerContent={key.content}
                answerType={key.type}
                answer={props.answer}
                questionId={props.questionId}
                onAnswerSelected={props.onAnswerSelected}
                questionCounter={props.questionCounter}
            />
        );
    }

    /**
     * Render number of quiz question, question and answer options.
     */
    return (
        <CSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div key={props.questionId}>
                <QuestionCount counter={props.questionId} total={props.questionTotal} />
                <Question content={props.question} />
                <ul className="answerOptions">
                    {props.answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        </CSSTransitionGroup>
    );
}

/**
 * Set the parameter type of each problem.
 * @type {{questionId: Validator<NonNullable<number>>, answer: Validator<NonNullable<string>>, question: Validator<NonNullable<string>>, questionTotal: Validator<NonNullable<number>>, onAnswerSelected: Validator<NonNullable<(...args: any[]) => any>>, answerOptions: Validator<NonNullable<any[]>>}}
 */
Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
