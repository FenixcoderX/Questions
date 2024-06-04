import { RECEIVE_USERS, CREATE_USER, REWRITE_USER } from '../actions/users';
import { SAVE_QUESTION_ANSWER, CREATE_QUESTION } from '../actions/questions';

//state - it is part of the state for users (state.users), it comes from combineReducers in index.js

/**
 * Reducer function for managing user data in the application state
 *
 * @param {Object} state - The current state of the users
 * @param {Object} action - The action object
 * @returns {Object} - The new state of the users
 */
export default function users(state = {}, action) {
  switch (action.type) {
    // Save users to the state from API
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    // Save new user to the state from API
    case CREATE_USER: {
      return {
        ...state,
        [action.user.id]: action.user,
      };
    }

    // Save answer to the question as string to the authed user object
    // Example path: state.userid.answers.questionid
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };

    // Save new question  to questions array inside the user object
    case CREATE_QUESTION:
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat([
            action.question.id,
          ]),
        },
      };

    // Rewrite user in the state
    case REWRITE_USER: {
      return {
        ...state,
        [action.user.id]: action.user,
      };
    }
    default:
      return state;
  }
}
