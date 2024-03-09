import { _getUsers,_getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

//const AUTHED_ID = "benanderson";
const AUTHED_ID =localStorage.getItem("authedUser");
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([
      _getUsers(),
      _getQuestions(),
  ]).then(([ users, questions ]) => {
    // console.log (users)
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}