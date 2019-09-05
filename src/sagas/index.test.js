import { all, call } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { initializeAppWatcher } from 'sagas/initialize'
import { sessionWatcher } from 'sagas/session'
import rootSaga from './index'

describe('Root saga', () => {
  const generator = rootSaga()

  it('starts the apiWatcher and the initializeApp saga', () => {
    expect(generator.next().value).toEqual(all([
      call(apiWatcher),
      call(sessionWatcher),
      call(initializeAppWatcher),
    ]))
  })
})
