/* eslint import/no-cycle: 0 */

import {
  select, call, put, all, takeEvery, takeLatest,
} from 'redux-saga/effects'

import {
  HANDLE_SUBSECTION_UPDATE,
  VALIDATE_FORM,
} from 'constants/actionTypes'

import {
  updateSubsection,
  updateSubsectionData,
  validateForm,
} from 'actions/FormActions'
import { updateApplication } from 'actions/ApplicationActions'

import { validateSection } from 'helpers/validation'
import sectionKeys from 'helpers/sectionKeys'
import { unschema } from 'schema'
import { env } from 'config'
import { selectApplicantBirthdate, selectMaritalStatus } from 'selectors/data'
import { selectValidUSPassport } from 'selectors/misc'
import { selectForm, selectSubsection, formTypeSelector } from './selectors'

/** LEGACY ACTIONS - store.application */
/** Setting form data on login (this might be replaced) */
export function* updateSectionDataLegacy(name, data) {
  try {
    yield all(Object.keys(data).map((subsection) => {
      const sectionKey = sectionKeys[`${name}.${subsection}`]
      const sectionData = unschema(data[subsection])

      const updateActions = [put(updateApplication(name, subsection, sectionData))]

      if (sectionKey) {
        // This sets form data but does not validate
        updateActions.push(put(updateSubsectionData(sectionKey, undefined, sectionData)))
      }

      return all(updateActions)
    }))
  } catch (e) {
    console.warn('failed to update section', name, e)
    yield call(env.History().push, '/error')
  }
}

export function* setFormData(data) {
  try {
    const { Metadata = {} } = data
    const formType = Metadata.form_type
    const formVersion = Metadata.form_version

    yield put(updateApplication('Settings', 'formType', formType))
    yield put(updateApplication('Settings', 'formVersion', formVersion))

    yield all(Object.keys(data)
      .map(section => call(updateSectionDataLegacy, section, data[section])))

    yield put(validateForm())
  } catch (e) {
    console.warn('failed to set form data', e)
    yield call(env.History().push, '/error')
  }
}

/** NEW ACTIONS - store.form */
// This fn currently unused. Will be useful if form starts field-level updates.
export const updateSectionData = (prevData, field, data) => ({
  ...prevData,
  [field]: {
    ...(prevData && prevData[field]),
    ...data,
  },
})

// Loop through all form sections and re-validate with the existing data
export function* handleValidateForm() {
  const formType = yield select(formTypeSelector)

  const applicantBirthdate = yield select(selectApplicantBirthdate)
  const maritalStatus = yield select(selectMaritalStatus)
  const hasValidUSPassport = yield select(selectValidUSPassport)
  // pass any x-section form data required to validate here
  const validationOptions = {
    applicantBirthdate,
    maritalStatus,
    ...hasValidUSPassport,
  }

  const formData = yield select(selectForm)

  yield all(Object.keys(formData)
    .map((key) => {
      const sectionData = formData[key].data
      const errors = validateSection({
        key,
        data: sectionData,
        options: validationOptions,
      }, formType)
      const newFormSection = {
        data: sectionData,
        errors: errors === true ? [] : errors,
        complete: errors.length === 0 || errors === true,
      }

      return put(updateSubsection(key, newFormSection))
    }))
}

export function* handleSubsectionUpdate({ key, data }) {
  const formType = yield select(formTypeSelector)
  const applicantBirthdate = yield select(selectApplicantBirthdate)
  const maritalStatus = yield select(selectMaritalStatus)
  const hasValidUSPassport = yield select(selectValidUSPassport)

  const formSection = yield select(selectSubsection, key)

  // This because currently, data is updated a whole subsection at a time
  // Consider changing to updateSectionData for field-level updates in the future
  const newData = { ...formSection.data, ...data }
  const errors = yield call(validateSection, {
    key,
    data: newData,
    options: { // pass any x-section form data required to validate here
      applicantBirthdate,
      maritalStatus,
      ...hasValidUSPassport,
    },
  }, formType)

  const newFormSection = {
    data: newData,
    errors: errors === true ? [] : errors,
    complete: errors.length === 0 || errors === true,
  }

  yield put(updateSubsection(key, newFormSection))
}

export function* formWatcher() {
  yield all([
    takeEvery(HANDLE_SUBSECTION_UPDATE, handleSubsectionUpdate),
    takeLatest(VALIDATE_FORM, handleValidateForm),
  ])
}
