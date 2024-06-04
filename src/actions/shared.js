import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

/**
 * Fetches all users from the server
 * @returns {Promise<Array>} A promise that resolves to an array of users
 */
 export const getUsers = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/allusers`);
    const users = await response.json();
    if (users.success === false) {
      throw new Error(users.message);
    }
    return users;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Problem with fetching users');
  }
};

/**
 * Fetches all questions from the server
 * @returns {Promise<Array>} A promise that resolves to an array of questions
 */
export const getQuestions = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/questions/allquestions`
    );
    
    const questions = await response.json();
    if (questions.success === false) {
      throw new Error(questions.message);
    }
    return questions;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Problem with fetching questions');
  }
};

/**
 * Asynchronous function that handles saving the initial data for the application.
 *
 * @returns {Function} A function that dispatches action to save "show loadingBar" state. It returns fetch requests to recieve
 * users and questions from API and then dispatches actions to save users, questions, authenticated user to the store and save show loadingBar state
 */
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([getUsers(), getQuestions()])
      .then(([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch(hideLoading());
        throw Error(error);
      });
  };
}
