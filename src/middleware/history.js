import axios from 'axios'
import { env } from '../config'
import SectionConstants from '../actions/SectionConstants'
import { updateApplication } from '../actions/ApplicationActions'
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
export const push = (path) => {
  return {
    type: PUSH_STATE,
    to: path
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

// Save the previous section's answers
export const saveMiddleware = store => next => action => {
  if (action.type === SectionConstants.SECTION_UPDATE || action.type === SectionConstants.SUBSECTION_UPDATE) {
    window.scroll(0, findPosition(document.getElementById('scrollTo')))
    unstickAll()

    if (action.previous && action.previous.section && action.previous.application) {
      const application = action.previous.application
      const section = action.previous.section.section
      const subsection = action.previous.section.subsection
      saveSection(application, section, subsection, store.dispatch)
    }
  }

  // Allow redux to continue the flow and executing the next middleware
  next(action)
}

export const saveSection = (application, section, subsection, dispatch, done) => {
  const pending = sectionData(section, subsection, application) || []
  if (pending.length === 0) {
    if (done) {
      done()
    }
    return
  }

  let requests = []
  for (const p of pending) {
    requests.push(api.save(schema(p.path.replace(/\//g, '.'), p.data, false)))
  }

  axios
    .all(requests)
    .then(() => {
      if (dispatch) {
        dispatch(updateApplication('Settings', 'saved', new Date()))
      }

      if (done) {
        done()
      }
    })
    .catch(() => {
      if (console && console.warn) {
        console.warn(`Failed to save data for the "${section}" section and "${subsection}" subsection`)
      }

      if (done) {
        done()
      }
    })
}
