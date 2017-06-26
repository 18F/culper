import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Navigation, { validations, isActive, hasErrors, isValid } from './Navigation'

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

  it('can count number of validations', () => {
    const section = {
      subsections: [
        { hidden: true, url: 'one' },
        { url: 'two' },
        {
          url: 'three',
          subsections: [
            { url: 'four' },
            { url: 'five' }
          ]
        },
        {
          url: 'six',
          subsections: [
            { url: 'seven' },
            { url: 'eight', hiddenFunc: () => { return true } }
          ]
        }
      ]
    }

    expect(validations(section, {})).toBe(4)
  })

  it('can determine if a path is active', () => {
    expect(isActive('/form/identification', '/form/foreign/activities/direct')).toBe(false)
    expect(isActive('/form/foreign', '/form/foreign/activities/direct')).toBe(true)
    expect(isActive('/form/foreign/activities', '/form/foreign/activities/direct')).toBe(true)
    expect(isActive('/form/foreign/activities/direct', '/form/foreign/activities/direct')).toBe(true)
  })

  it('can determine a section has errors', () => {
    const props = {
      errors: {
        foreign: [
          { section: 'foreign', subsection: 'activities/direct', valid: false, code: 'date.month.notfound' },
          { section: 'foreign', subsection: 'activities/direct', valid: true, code: 'acquired.length' },
          { section: 'foreign', subsection: 'activities/indirect', valid: false, code: 'date.month.notfound' }
        ],
        identification: []
      }
    }

    expect(hasErrors('/form/foreign', props)).toBe(true)
    expect(hasErrors('/form/foreign/activities/direct', props)).toBe(true)
    expect(hasErrors('/form/identification', props)).toBe(false)
  })

  it('can determine if a section is valid', () => {
    const props = {
      completed: {
        foreign: [
          { section: 'foreign', subsection: 'activities/direct', valid: false },
          { section: 'foreign', subsection: 'activities/direct', valid: true },
          { section: 'foreign', subsection: 'activities/indirect', valid: false }
        ],
        identification: [],
        citizenship: [
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true }
        ]
      }
    }

    expect(isValid('/form/foreign', props)).toBe(false)
    expect(isValid('/form/identification', props)).toBe(false)
    expect(isValid('/form/citizenship', props)).toBe(true)
    expect(isValid('/form/citizenship/multiple', props)).toBe(true)
  })

  it('displays proper arrows on subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const location = () => { return { pathname: '/form/legal/associations/engaged-in-terrorism' } }
    const component = mount(<Provider store={store}><Navigation location={location} /></Provider>)
    expect(component.find('.fa-angle-up').length).toBe(2)
    expect(component.find('.fa-angle-down').length).toBeGreaterThan(1)
  })
})
