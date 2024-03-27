export const SET_AUTHED_USER = "SET_AUTHED_USER";


/**
 * Creates an action to set the authenticated user
 *
 * @param {string} id - The ID of the authenticated user
 * @returns {Object} An action object with the type and ID of the authenticated user
 */
export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}