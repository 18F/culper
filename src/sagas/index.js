import { all } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { initializeFormData, initializeApp } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'

export const selectState = state => state

export default function* rootSaga() {
  yield all([
    apiWatcher(),
    initializeApp(),
    initializeFormData(),
    validateWatcher(),
  ])
}
