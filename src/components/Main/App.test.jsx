import React from 'react'
import { MemoryRouter } from 'react-router'
import App from './App'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { testSnapshot } from '../test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

test('Renders homepage', () => {
  // Setup
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore({
    authentication: [],
    application: {
      Settings: {
        mobileNavigation: false
      },
      Navigation: {
        sections: [],
        totalSections: 10,
        completedSectionsTotal: 0
      },
      Completed: {}
    }
  })

  testSnapshot(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  )
})
