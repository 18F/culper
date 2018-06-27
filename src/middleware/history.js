import axios from 'axios'
import { updateApplication } from '../actions/ApplicationActions'
import { sectionData } from '../components/Section/sectionData'
import schema from '../schema'
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
