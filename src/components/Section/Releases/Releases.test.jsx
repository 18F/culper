import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Releases from './Releases'

const applicationState = {
  Releases: {}
}

describe('The legal section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Releases /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Releases /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
