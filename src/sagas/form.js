import {
  take, select, call, put,
} from 'redux-saga/effects'
import { HANDLE_SUBSECTION_UPDATE } from 'constants/actionTypes'
import { updateSubsection } from 'actions/FormActions'
import { validateSection } from 'helpers/validation'
import { selectSubsection, formTypeSelector } from './selectors'

export const updateSectionData = (prevData, field, data) => ({
  ...prevData,
  [`${field}`]: {
    ...(prevData && prevData[field]),
    ...data,
  },
})

export function* handleSubsectionUpdate({ key, field, data }) {
  // console.log('handle update', key, field)
  const formType = yield select(formTypeSelector)
  const formSection = yield select(selectSubsection, key)
  const newData = yield call(updateSectionData, formSection.data, field, data)
  const errors = yield call(validateSection, key, newData, formType)

  const newFormSection = {
    data: newData,
    errors,
    complete: errors.length === 0,
  }

  yield put(updateSubsection(key, newFormSection))
}

export function* updateSubsectionWatcher() {
  yield take(HANDLE_SUBSECTION_UPDATE, handleSubsectionUpdate)
}
