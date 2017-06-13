import { env } from '../config'
import { reducer } from '../reducers/application'
import SectionConstants from '../actions/SectionConstants'
import { updateApplication, clearErrors } from '../actions/ApplicationActions'

export const findPosition = (el) => {
  let currentTop = 0

  if (el && el.offsetParent) {
    do {
      currentTop += el.offsetTop
    } while (el = el.offsetParent)
  }

  return [currentTop]
}

export const PUSH_STATE = 'PUSH'

/**
 * historyMiddleware is a custom middleware function for redux that allows history actions to be
 * dispatched in order to change router paths.
 */
export const historyMiddleware = store => next => action => {
  // If we get a PUSH_STATE type, modify hisory
  if (action.type === PUSH_STATE) {
    if (action.scrollTo) {
      window.scroll(0, findPosition(document.getElementById(action.scrollTo)))
    }
    env.History().push(action.to)
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

export const settingsMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    store.dispatch(updateApplication('Settings', 'mobileNavigation', false))
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

export const clearErrorsMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    //const state = store.getState()
    //const errors = state.application.Errors[action.section] || []
    //const filtered = errors.filter(x => x.section === action.section && x.subsection !== action.subsection)
    //store.dispatch(updateApplication('Errors', action.section, filtered))
    store.dispatch(clearErrors(action.section, action.subsection))
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

/**
 * Action requesting a history push state
 */
export function push (path, scrollTo = 'scrollTo') {
  return {
    type: PUSH_STATE,
    to: path,
    scrollTo: scrollTo
  }
}
