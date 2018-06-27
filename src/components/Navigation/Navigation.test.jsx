import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Navigation from './Navigation'

describe('The navigation component', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: {} })
    const component = mount(<Provider store={store}><MemoryRouter><Navigation /></MemoryRouter></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ application: { Identification: {} }, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><MemoryRouter><Navigation /></MemoryRouter></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('displays proper arrows on subsections', () => {
    const store = mockStore({ application: { Identification: {} }, authentication: { authenticated: true, twofactor: true } })
    const location = () => { return { pathname: '/form/legal/associations/engaged-in-terrorism' } }
    const component = mount(<Provider store={store}><MemoryRouter><Navigation location={location} /></MemoryRouter></Provider>)
    component.find('a[title="Investigative and criminal history"]').simulate('click')
    expect(component.find('.fa-angle-up').length).toBe(2)
    expect(component.find('.fa-angle-down').length).toBeGreaterThan(1)
  })
})
