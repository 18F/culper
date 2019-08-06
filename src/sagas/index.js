import { all, call } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { sessionWatcher } from 'sagas/session'
import { initializeAppWatcher } from 'sagas/initialize'

export default function* rootSaga() {
  yield all([
    call(apiWatcher),
    call(sessionWatcher),
    call(initializeAppWatcher),
  ])
}
