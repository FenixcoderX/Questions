export const RECEIVE_USERS = "RECEIVE_USERS";
export const CREATE_USER = "CREATE_USER";
export const REWRITE_USER = "REWRITE_USER";
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

/**
 * Creates an action to create user
 *
 * @param {Object} users - The object with user to be received
 * @returns {Object} An action object with the type and user
 */
export function createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

/**
 * Creates an action to rewrite a user
 *
 * @param {Object} user - The user object to be rewritten
 * @returns {Object} An action object with the type and user
 */
export function rewriteUser(user) {
  return {
    type: REWRITE_USER,
    user,
  };
}