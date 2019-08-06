/* eslint import/no-cycle: 0 */

import {
  take, select, call, put, all,
} from 'redux-saga/effects'

import { HANDLE_SUBSECTION_UPDATE } from 'constants/actionTypes'

import { updateSubsection } from 'actions/FormActions'
import { updateApplication, validateFormData } from 'actions/ApplicationActions'

import { validateSection } from 'helpers/validation'
import { unschema } from 'schema'
import { env } from 'config'
import { selectSubsection, formTypeSelector } from './selectors'

/** LEGACY ACTIONS - store.application */
/** Setting form data on login (this might be replaced) */
export function* updateSectionDataLegacy(name, data) {
  try {
    yield all(Object.keys(data).map(subsection => put(
      updateApplication(
        name,
        subsection,
        unschema(data[subsection]),
      )
    )))
  } catch (e) {
    console.warn('failed to update section', name, e)
    yield call(env.History().push, '/error')
  }
}

export function* setFormData(action) {
  const { data } = action

  try {
    const { Metadata = {} } = data
    const formType = window.formType ? window.formType : Metadata.form_type
    const formVersion = Metadata.form_version

    yield put(updateApplication('Settings', 'formType', formType))
    yield put(updateApplication('Settings', 'formVersion', formVersion))

    yield all(Object.keys(data)
      .map(section => call(updateSectionDataLegacy, section, data[section])))

    yield put(validateFormData())
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

export function* handleSubsectionUpdate({ key, data }) {
  const formType = yield select(formTypeSelector)
  const formSection = yield select(selectSubsection, key)

  // This because currently, data is updated a whole subsection at a time
  // Consider changing to updateSectionData for field-level updates in the future
  const newData = { ...formSection.data, ...data }
  const errors = yield call(validateSection, { key, data: newData, formType })

  const newFormSection = {
    data: newData,
    errors: errors === true ? [] : errors,
    complete: errors.length === 0 || errors === true,
  }

  yield put(updateSubsection(key, newFormSection))
}

export function* updateSubsectionWatcher() {
  while (true) {
    const action = yield take(HANDLE_SUBSECTION_UPDATE)
    yield call(handleSubsectionUpdate, action)
  }
}
