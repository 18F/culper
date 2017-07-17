import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Psychological from './Psychological'

const applicationState = {
  Psychological: {}
}

describe('The legal section', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [], application: applicationState })
    const component = mount(<Provider store={store}><Psychological /></Provider>)
    expect(component.find('div').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true, application: applicationState } })
    const component = mount(<Provider store={store}><Psychological /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can update review section', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: 'Yes'
        }
      }
    }
    const store = mockStore({ application: appState, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('.competence .accordion').length).toBe(1)
  })

  it('can complete section', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: 'No'
        },
        Consultation: {
          Consulted: 'No'
        },
        Diagnoses: {
          Diagnosed: 'Yes',
          DidNotConsult: 'No',
          InTreatment: 'No'
        },
        Hospitalization: {
          Hospitalized: 'No'
        },
        ExistingConditions: {
          HasCondition: 'No',
          ReceivedTreatment: 'Decline'
        }
      }
    }
    const store = mockStore({ application: appState, authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><Psychological subsection="review" /></Provider>)
    expect(component.find('div').length).toBeGreaterThan(0)
    expect(component.find('.competence .accordion').length).toBe(0)
    expect(component.find('.consultation .accordion').length).toBe(0)
    expect(component.find('.hospitalizations .accordion').length).toBe(0)
    expect(component.find('.diagnoses .accordion').length).toBe(1)
    expect(component.find('.existingconditions .accordion').length).toBe(0)
    expect(component.find('textarea#DidNotFollowExplanation').length).toBe(0)
  })
})
