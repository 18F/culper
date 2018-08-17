import React from 'react'
import { MemoryRouter } from 'react-router'
import App from './App'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { testSnapshot } from '../test-helpers'

test('Renders homepage', () => {
  // Setup
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore({
    authentication: [],
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
