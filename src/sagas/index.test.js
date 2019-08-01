import { all } from 'redux-saga/effects'

import { apiWatcher } from 'sagas/api'
import { initializeFormData, initializeApp } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'
import rootSaga from './index'

describe.skip('Root saga', () => {
  const generator = rootSaga()

  it('starts the initializeFormData and validateWatcher sagas', () => {
    expect(generator.next().value).toEqual(all([
      apiWatcher(),
      initializeApp(),
      initializeFormData(),
      validateWatcher(),
    ]))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})
