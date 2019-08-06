import { all, call } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { initializeApp } from 'sagas/initialize'

export const selectState = state => state

export default function* rootSaga() {
  yield all([
    call(apiWatcher),
    call(initializeApp),
  ])
}
