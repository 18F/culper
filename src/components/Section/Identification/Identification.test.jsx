import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Identification from './Identification'
import { mount } from 'enzyme'

const applicationState = {
  Identification: {
    Contacts: {
      Emails: { items: [] },
      PhoneNumbers: { items: [] }
    }
  }
}

describe('The identification section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Identification /></Provider>)
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true }, application: applicationState })
    const component = mount(<Provider store={store}><Identification /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true }, application: applicationState })
    const component = mount(<Provider store={store}><Identification subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['name', 'birthdate', 'birthplace', 'ssn']
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })

    sections.forEach((section) => {
      const component = mount(<Provider store={store}><Identification subsection={section} /></Provider>)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
