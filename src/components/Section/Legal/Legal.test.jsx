import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Legal from './Legal'

const applicationState = {
  Legal: {}
}

describe('The legal section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <Legal subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['police', 'review']
    const store = mockStore({})

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Legal subsection={section} />
        </Provider>
      )
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
    const store = mockStore({})

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Legal subsection={section} />
        </Provider>
      )
      component.find('.no input').simulate('change')
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
