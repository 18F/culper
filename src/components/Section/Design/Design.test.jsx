import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Design from './Design'

describe('The citizenship section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [], application: {} })
    const component = mount(<Provider store={store}><Design /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: {} } })
    const component = mount(<Provider store={store}><Design /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['headings']
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })

    sections.forEach((section) => {
      const component = mount(<Provider store={store}><Design subsection={section} /></Provider>)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
