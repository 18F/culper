import { all } from 'redux-saga/effects'

import { initializeFormData } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'
import rootSaga from './index'

describe('Root saga', () => {
  const generator = rootSaga()

  it('starts the initializeFormData and validateWatcher sagas', () => {
    expect(generator.next().value).toEqual(all([
      initializeFormData(),
      validateWatcher(),
    ]))
  })

  it('is done', () => {
    expect(generator.next().done).toBe(true)
  })
})
