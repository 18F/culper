import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Section from './Section'
import { mount } from 'enzyme'

describe('The section component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><MemoryRouter><Section /></MemoryRouter></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    window.token = 'fake-token'
    const store = mockStore({ authentication: { authenticated: true, token: 'fake-token' } })
    const component = mount(<Provider store={store}><MemoryRouter><Section /></MemoryRouter></Provider>)
    expect(component.find('div').length > 0).toBe(true)
  })
})
