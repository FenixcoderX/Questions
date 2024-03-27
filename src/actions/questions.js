import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const CREATE_QUESTION = 'CREATE_QUESTION';

/**
 * Creates an action to receive questions
 *
 * @param {Object} questions - The object with questions
 * @returns {Object} An action object with the type and questions
 */
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

//

/**
 * Creates an action to save the question answer. This action uses in users and questions reducers (because we need to update parts of state for users and questions)
 *
 * @param {Object} params - The parameters for saving the question answer
 * @param {string} params.authedUser - The ID of the authenticated user
 * @param {string} params.qid - The ID of the question
 * @param {string} params.answer - The answer to the question
 * @returns {Object} - The action object with the type, authedUser, qid, and answer.
 */
export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

/**
 * Asynchronous function that handles saving the question answer to api and store
 *
 * @param {string} qid - The ID of the question
 * @param {string} answer - The answer to the question
 * @returns {Function} - A function that returns fetch request to API and then dispatches the saveQuestionAnswer action
 */
export function handleSaveQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState(); // get the authenticated user from the state
    
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() =>
        dispatch(
          saveQuestionAnswer({
            authedUser,
            qid,
            answer,
          })
        )
      )
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer: ', e);
        alert('The was an error answering the question. Try again.');
      });
  };
}

/**
 * Creates an action to save a new question
 *
 * @param {Object} question - The question to be created
 * @returns {Object} An action object with the type and question
 */
export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}

/**
 * Asynchronous function that handles saving new question to api and store
 *
 * @param {string} optionOneText - The text for the first option answer of the question
 * @param {string} optionTwoText - The text for the second option answer of the question
 * @returns {Function} A function that returns fetch request to API and then dispatches the createQuestion action
 */
export function handleСreateQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(createQuestion(question)))
      .catch((e) => {
        console.warn('Error in handleСreateQuestion: ', e);
        alert('The was an error creating new question. Try again.');
      });
  };
}
