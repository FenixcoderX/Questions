/**
 * Middleware function that logs the action and the new state to the console.
 */
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('The action: ', action);
  const returnValue = next(action);                   // Calls dispatch, because it should be last middleware in the chain
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return returnValue;                                  // Return the result that we have after invoking next
};

export default logger;
