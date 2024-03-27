import { _getUsers,_getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

//const AUTHED_ID = "benanderson";
const AUTHED_ID =localStorage.getItem("authedUser");

/**
 * Asynchronous function that handles saving the initial data for the application.
 * 
 * @returns {Function} A function that dispatches action to save "show loadingBar" state. It returns fetch requests to recieve 
 * users and questions from API and then dispatches actions to save users, questions, authenticated user to the store and save show loadingBar state
 */
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([
      _getUsers(),
      _getQuestions(),
  ]).then(([ users, questions ]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}