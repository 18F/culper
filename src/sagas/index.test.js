import { all } from 'redux-saga/effects'

import { initializeFormData } from 'sagas/initialize'
import { validateWatcher } from 'sagas/validate'
import { updateSubsectionWatcher } from 'sagas/form'
import rootSaga from './index'

// Stop testing this until we've introduced canceling via log out
describe.skip('Root saga', () => {
  const generator = rootSaga()

  it('starts the initializeFormData and validateWatcher sagas', () => {
    expect(generator.next().value).toEqual(all([
      initializeFormData(),
      validateWatcher(),
      updateSubsectionWatcher(),
    ]))
  })
})
