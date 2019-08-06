import { all, call } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { initializeApp } from 'sagas/initialize'
import rootSaga from './index'

// Stop testing this until we've introduced canceling via log out
describe('Root saga', () => {
  const generator = rootSaga()

  it('starts the apiWatcher and the initializeApp saga', () => {
    expect(generator.next().value).toEqual(all([
      call(apiWatcher),
      call(initializeApp),
    ]))
  })

  /*
  it('starts the initializeFormData and validateWatcher sagas', () => {
    expect(generator.next().value).toEqual(all([
      apiWatcher(),
      initializeAppWatcher(),
      initializeFormData(),
      validateWatcher(),
      updateSubsectionWatcher(),
      authWatcher(),
    ]))
  }) */
})
