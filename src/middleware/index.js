import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

// Middleware will be applied in point between dispatching an action, and the moment it reaches the reducer. In the order it is listed
export default applyMiddleware(thunk, logger);
