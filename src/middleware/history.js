import { hashHistory } from 'react-router'

export const PUSH_STATE = 'PUSH'

/**
 * historyMiddleware is a custom middleware function for redux that allows history actions to be
 * dispatched in order to change router paths.
 */
export const historyMiddleware = store => next => action => {
  // If we get a PUSH_STATE type, modify hisory
  if (action.type === PUSH_STATE) {
    return hashHistory.push(action.to)
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

/**
 * Action requesting a history push state
 */
export function push (path) {
  return {
    type: PUSH_STATE,
    to: path
  }
}
