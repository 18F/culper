import { api } from '../services'
import { unschema } from '../schema'

export function getApplicationState () {
  return function (dispatch, getState) {
    api.form().then(r => {
      const form = r.data
      for (const section in form) {
        for (const subsection in form[section]) {
          dispatch(updateApplication(section, subsection, unschema(form[section][subsection])))
        }
      }
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
