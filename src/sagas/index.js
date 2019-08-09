import { all } from 'redux-saga/effects'

import { initializeFormData } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'
import { updateSubsectionWatcher } from 'sagas/form'

export const selectState = state => state

export default function* rootSaga() {
  yield all([
    initializeFormData(),
    validateWatcher(),
    updateSubsectionWatcher(),
  ])
}
