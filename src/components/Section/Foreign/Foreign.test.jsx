import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Foreign from './Foreign'
import Passport from './Passport'
import { mount } from 'enzyme'

const applicationState = {
  Foreign: {}
}

describe('The foreign section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Foreign /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Foreign subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['passport', 'contacts', 'business', 'business/advice']
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })

    sections.forEach((section) => {
      const component = mount(<Provider store={store}><Foreign subsection={section} /></Provider>)
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('can parse previous names', () => {
    const store = mockStore({
      authentication: { authenticated: true, twofactor: true },
      application: {
        Identification: {
          ApplicantName: {
            first: 'john',
            last: 'smith'
          },
          OtherNames: {
            List: [
              {
                first: 'johnathan',
                last: 'smith'
              }
            ]
          }
        }
      }
    })
    const component = mount(<Provider store={store}><Foreign subsection="passport" /></Provider>)
    expect(component.find(Passport).props().suggestedNames.length).toBe(2)
  })
})
