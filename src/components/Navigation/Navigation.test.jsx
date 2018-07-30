import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import Navigation from './Navigation'

describe('Navigation component', () => {
  window.token = 'fake-token'
  const mockStore = configureMockStore()

  it('renders correctly', () => {
    const store = mockStore({ authentication: { authenticated: true } })

    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
