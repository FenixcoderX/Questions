import { SET_AUTHED_USER } from '../actions/authedUser';

/**
 * Reducer function for managing the authenticated user state
 *
 * @param {string} state - The current state of the authenticated user
 * @param {Object} action - The action object
 * @returns {string} The new state of the authenticated user
 */
export default function authedUser(state = null, action) {
  switch (action.type) {
    // Save id of the authenticated user to the state
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
