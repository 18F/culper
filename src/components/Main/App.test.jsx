import React from 'react'
import { MemoryRouter } from 'react-router'
import App from 'components/Main/App'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { testSnapshot } from 'components/test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

test('Renders homepage', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    application: {
      Settings: {
        mobileNavigation: false
      }
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
