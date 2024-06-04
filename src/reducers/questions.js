import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  CREATE_QUESTION,
  REWRITE_QUESTION,
} from '../actions/questions';

/**
 * Reducer function for managing the state of questions
 *
 * @param {Object} state - The current state of questions
 * @param {Object} action - The action object
 * @returns {Object} - The new state of questions after applying the action
 */
export default function questions(state = {}, action) {
  switch (action.type) {
    // Save questions to the state from API
    case RECEIVE_QUESTIONS:
      return {
        ...state, // using the spread operator to copy all the properties from action.questions object to the state object
        ...action.questions,
      };

    // Save nickname of the user who answered the question to votes array inside the question object
    // Example path: state.6ni6ok3ym7mf1p33lnez.optionOne.votes (state.questionId.answer.votes)
    case SAVE_QUESTION_ANSWER:
      return {
        ...state, // using the spread operator to create a copy of all properties of the existing state
        [action.qid]: {
          // creating or updating a property in the state object with a key of action.qid. The value of this property is another object, which is defined in the following lines
          ...state[action.qid], // creating a copy of all properties of the existing question object in the state[action.qid]
          [action.answer]: {
            // the same like above
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };

    // Save new question to the state
    case CREATE_QUESTION:
      const { question } = action; // destructuring the action object to get the question property
      return {
        ...state,
        [question.id]: question,
      };

    // Rewrite question in the state
    case REWRITE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

    default:
      return state;
  }
}
