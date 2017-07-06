import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Navigation from './Navigation'

describe('The navigation component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: {} })
    const component = mount(<Provider store={store}><Navigation /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Navigation /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('displays proper arrows on subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const location = () => { return { pathname: '/form/legal/associations/engaged-in-terrorism' } }
    const component = mount(<Provider store={store}><Navigation location={location} /></Provider>)
    expect(component.find('.fa-angle-up').length).toBe(2)
    expect(component.find('.fa-angle-down').length).toBeGreaterThan(1)
  })
})
