import { env } from '../config'
import { reducer } from '../reducers/application'
import SectionConstants from '../actions/SectionConstants'
import { updateApplication, clearErrors } from '../actions/ApplicationActions'
import { bits } from '../components/SavedIndicator'
import schema, { unschema } from '../schema'
import { api } from '../services'

export const findPosition = (el) => {
  let currentTop = 0

  if (el && el.offsetParent) {
    do {
      currentTop += el.offsetTop
      el = el.offsetParent
    } while (el)
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

// Save the previous section's answers
export const sectionMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    if (action.section && action.subsection) {
      const payloadType = `${action.section}/${action.subsection}`.replace('/', '.')
      api
        .section(payloadType)
        .then(r => {
          store.dispatch(updateApplication(action.section, action.subsection, unschema(r.data)))
        })
        .catch(() => {
          if (console && console.warn) {
            console.warn(`Failed to retrieve data for the "${action.section}" section and "${action.subsection}" subsection`)
          }
        })
    }
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

// Save the previous section's answers
export const saveMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    if (action.previous && action.previous.section && action.previous.application) {
      const section = action.previous.section
      const application = action.previous.application
      const pending = bits(section.section, section.subsection, application)
      if (pending) {
        const payload = schema(`${section.section}/${section.subsection}`.replace('/', '.'), pending, false)
        api
          .save(payload)
          .then(r => {
            store.dispatch(updateApplication('Settings', 'saved', new Date()))
          })
          .catch(() => {
            if (console && console.warn) {
              console.warn(`Failed to save data for the "${section}" section and "${subsection}" subsection`)
            }
          })
      }
    }
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
