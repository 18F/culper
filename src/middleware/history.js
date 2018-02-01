import { env } from '../config'
import SectionConstants from '../actions/SectionConstants'
import { updateApplication, clearErrors } from '../actions/ApplicationActions'
import { sectionData } from '../components/Section/sectionData'
import schema from '../schema'
import { api } from '../services'
import { unstickAll } from '../components/Sticky/sidebar'

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
 * Action requesting a history push state
 */
export const push = (path, scrollTo = 'scrollTo') => {
  return {
    type: PUSH_STATE,
    to: path,
    scrollTo: scrollTo
  }
}

/**
 * historyMiddleware is a custom middleware function for redux that allows history actions to be
 * dispatched in order to change router paths.
 */
export const historyMiddleware = store => next => action => {
  // If we get a PUSH_STATE type, modify hisory
  if (action.type === PUSH_STATE) {
    env.History().push(action.to)
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

// Retrieve the section's answers
export const sectionMiddleware = store => next => action => {
  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

// Save the previous section's answers
export const saveMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    window.scroll(0, findPosition(document.getElementById(action.scrollTo || 'scrollTo')))
    unstickAll()

    if (action.previous && action.previous.section && action.previous.application) {
      const section = action.previous.section
      const application = action.previous.application
      const pending = sectionData(section.section, section.subsection, application)
      if (pending) {
        const payload = schema(`${section.section}/${section.subsection}`.replace(/\//g, '.'), pending, false)
        api
          .save(payload)
          .then(r => {
            store.dispatch(updateApplication('Settings', 'saved', new Date()))
          })
          .catch(() => {
            if (console && console.warn) {
              console.warn(`Failed to save data for the "${section.section}" section and "${section.subsection}" subsection`)
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
