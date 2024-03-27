export const RECEIVE_USERS = "RECEIVE_USERS";

/**
 * Creates an action to receive users
 *
 * @param {Object} users - The object with users to be received
 * @returns {Object} An action object with the type and users
 */
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}