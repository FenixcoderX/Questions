import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";

// When combineReducers calls each reducer in turn, the reducer is called with the parameter state.nameOfTheReducer
// Example: users(state.users, action), so the users key appears inside state
export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});