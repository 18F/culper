import axios from 'axios'
import { updateApplication } from '../../actions/ApplicationActions'
import sectionData from '../Section/sectionData'
import schema from '../../schema'
import { api } from '../../services'
import { i18n } from '../../config'

export const saveSection = (application, section, subsection, dispatch) => {
  const pending = sectionData(section, subsection, application) || []

  let requests = []
  for (const p of pending) {
    requests.push(api.save(schema(p.path.replace(/\//g, '.'), p.data, false)))
  }

  return axios
    .all(requests)
    .then(() => {
      if (dispatch) {
        dispatch(updateApplication('Settings', 'saved', new Date()))
        dispatch(updateApplication('Settings', 'saveError', false))
      }
    })
    .catch(() => {
      if (console && console.warn) {
        console.warn(
          `Failed to save data for the "${section}" section and "${subsection}" subsection`
        )
      }
      if (dispatch) {
        dispatch(updateApplication('Settings', 'saveError', true))
      }
      throw new Error(i18n.t('saved.error.message'))
    })
}
