import { env } from 'config'
import { api } from 'services'

import * as actionTypes from 'constants/actionTypes'

export const validateFormData = () => ({
  type: actionTypes.VALIDATE_FORM_DATA,
})

export const setFormData = (data, cb = () => {}) => ({
  type: actionTypes.SET_FORM_DATA,
  data,
  cb,
})

export function updateApplication(section, property, values) {
  return {
    type: `${section}.${property}`,
    section,
    property,
    values,
  }
}

export function getApplicationState(done) {
  return (dispatch) => {
    let locked = false
    let formData = {}
    api
      .status()
      .then((r) => {
        const statusData = (r || {}).data || {}
        dispatch(updateApplication('Settings', 'locked', statusData.Locked))
        dispatch(updateApplication('Settings', 'hash', statusData.Hash))

        if (statusData.Locked) {
          locked = true
          env.History().push('/locked')
        }
      })
      .then(() => {
        if (locked) {
          return
        }

        api
          .form()
          .then((r) => {
            formData = r.data
            const formType = window.formType ? window.formType : formData.Metadata.form_type

            dispatch(updateApplication('Settings', 'formType', formType))
            dispatch(updateApplication('Settings', 'formVersion', formData.Metadata.form_version))
            dispatch(setFormData(formData, done))
          })
      })
      .catch(() => {
        env.History().push('/error')
      })
  }
}

/* Special action that provides a way to flush all errors for a section+subsection upon entry so
 * it may be stored with the re-validated data.
 */
export function clearErrors(property, subsection) {
  const section = 'Errors'
  return {
    type: `${section}.${property}`,
    section,
    property,
    subsection,
    clear: true,
  }
}

/**
 * This is a generic function to report any errors for a particular
 * section.
 */
export function reportErrors(section, subsection, codes) {
  // set the section and subsection, in case not otherwise set
  const mappedCodes = codes.map(err => ({
    ...err,
    section: err.section || section,
    subsection: err.subsection || subsection,
  }))
  return updateApplication('Errors', section, mappedCodes)
}

export function reportCompletion(section, subsection, status) {
  return updateApplication('Completed', section, [
    {
      code: `${section}/${subsection}`.trim(),
      section,
      subsection,
      valid: status,
    },
  ])
}

export function updateIdentificationApplicantName(values) {
  return updateApplication('Identification', 'ApplicantName', values)
}

export function updateIdentificationBirthPlace(values) {
  return updateApplication('Identification', 'ApplicantBirthPlace', values)
}

export function updateIdentificationBirthDate(values) {
  return updateApplication('Identification', 'ApplicantBirthDate', values)
}

export function updateIdentificationSSN(values) {
  return updateApplication('Identification', 'ApplicantSSN', values)
}
