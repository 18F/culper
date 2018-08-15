import React from 'react'
import renderer from 'react-test-renderer'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { api } from '../../../services'
import Print from './Print'

const applicationState = {
  Application: {}
}

describe('The print section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  beforeEach(() => {
    const mock = new MockAdapter(api.proxy)
    mock.onGet('/me/attachment').reply(200, {})
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
    expect(component.find('.section-print-container').length).toBe(10)
  })

  it('launches print dialog', () => {
    let printed = false
    window.print = function() {
      printed = true
    }
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
    component.find('.print-btn').simulate('click')
    expect(printed).toBe(true)
  })

  it('renders properly', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    const component = renderer.create(
      <Provider store={store}>
        <Print subsection="intro" />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
