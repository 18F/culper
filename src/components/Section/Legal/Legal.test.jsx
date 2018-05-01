import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Legal from './Legal'

const applicationState = {
  Legal: {}
}

describe('The legal section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Legal /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Legal /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Legal subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['police', 'review']
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })

    sections.forEach((section) => {
      const component = mount(<Provider store={store}><Legal subsection={section} /></Provider>)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('can go to each subsection and select yes to branch', () => {
    const sections = [
      'police/offenses',
      'police/additionaloffenses',
      'police/domesticviolence',
      'investigations/history',
      'investigations/revoked',
      'investigations/debarred',
      'technology/unauthorized',
      'technology/manipulating',
      'technology/unlawful',
      'associations/terrorist-organization',
      'associations/engaged-in-terrorism',
      'associations/advocating',
      'associations/membership-overthrow',
      'associations/membership-violence-or-force',
      'associations/activities-to-overthrow',
      'associations/terrorism-association'
    ]
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })

    sections.forEach((section) => {
      const component = mount(<Provider store={store}><Legal subsection={section} /></Provider>)
      component.find('.no input').simulate('change')
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
