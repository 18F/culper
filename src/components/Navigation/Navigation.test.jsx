import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import Navigation from './Navigation'
import { testSnapshot } from '../test-helpers'

describe('Navigation component', () => {
  window.token = 'fake-token'
  const mockStore = configureMockStore()

  it('renders correctly', () => {
    const store = mockStore({ authentication: { authenticated: true } })

    testSnapshot(
      <MemoryRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </MemoryRouter>
    )
  })
})
