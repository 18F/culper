/* eslint import/no-cycle: 0 */

import {
  take, select, call, put,
} from 'redux-saga/effects'
import { HANDLE_SUBSECTION_UPDATE } from 'constants/actionTypes'
import { updateSubsection } from 'actions/FormActions'
import { validateSection } from 'helpers/validation'
import { selectSubsection, formTypeSelector } from './selectors'

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
