import { navigationWalker } from '../config'
import { api } from '../services'
import schema, { unschema } from '../schema'
import validate from '../validators'
import { push } from '../middleware/history'

export function getApplicationState () {
  return function (dispatch, getState) {
    let locked = false
    let formData = {}
    api.status().then(r => {
      const statusData = (r || {}).data || {}
      dispatch(updateApplication('Settings', 'locked', statusData.Locked))
      dispatch(updateApplication('Settings', 'hash', statusData.Hash))

      if (statusData.Locked) {
        locked = true
        dispatch(push('/locked'))
      }
    })
    .then(() => {
      if (locked) {
        return
      }
      return api.form().then(r => {
        formData = r.data
        for (const section in formData) {
          for (const subsection in formData[section]) {
            dispatch(updateApplication(section, subsection, unschema(formData[section][subsection])))
          }
        }
      })
    })
    .then(() => {
      if (locked) {
        return
      }

      validateApplication(dispatch, formData)
    })
    .catch(() => {
      if (console && console.warn) {
        console.warn('Failed to retrieve form saved data')
      }
    })
  }
}

export function updateApplication (section, property, values) {
  return {
    type: `${section}.${property}`,
    section: section,
    property: property,
    values: values
  }
}

export function validateApplication (dispatch, application = {}) {
  navigationWalker((path, child) => {
    if (path.length && path[0].store && child.store && child.validator) {
      const sectionName = path[0].url
      let data = application[path[0].store][child.store] || {}

      let subsectionName = child.url
      if (path.length > 1) {
        for (let i = path.length - 1; i > 0; i--) {
          subsectionName = `${path[i].url}/${subsectionName}`
        }
      }

      let valid = null
      try {
        if (data.type && data.props) {
          data = schema(data.type, unschema(data.props))
        }
        valid = validate(data)
      } catch (e) {
        valid = null
      }

      dispatch(reportCompletion(sectionName.toLowerCase(), subsectionName.toLowerCase(), valid))
    }
  })
}

export function clearErrors (property, subsection) {
  const section = 'Errors'
  return {
    type: `${section}.${property}`,
    section: section,
    property: property,
    subsection: subsection,
    clear: true
  }
}

/**
 * This is a generic function to report any errors for a particular
 * section.
 */
export function reportErrors (section, subsection, codes) {
  return updateApplication('Errors', section, codes)
}

export function reportCompletion (section, subsection, status) {
  return updateApplication('Completed', section, [{ code: `${section}/${subsection}`.trim(), section: section, subsection: subsection, valid: status }])
}

export function updateIdentificationApplicantName (values) {
  return updateApplication('Identification', 'ApplicantName', values)
}

export function updateIdentificationBirthPlace (values) {
  return updateApplication('Identification', 'ApplicantBirthPlace', values)
}

export function updateIdentificationBirthDate (values) {
  return updateApplication('Identification', 'ApplicantBirthDate', values)
}

export function updateIdentificationSSN (values) {
  return updateApplication('Identification', 'ApplicantSSN', values)
}
