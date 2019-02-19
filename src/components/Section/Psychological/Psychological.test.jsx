import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Psychological from './Psychological'

const applicationState = {
  Psychological: {}
}

describe('The psych section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({})
    const component = mount(
      <Provider store={store}>
        <Psychological subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can update review section', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'Yes' }
        }
      }
    }
    const store = mockStore({
      application: appState
    })
    const component = mount(
      <Provider store={store}>
        <Psychological subsection="review" />
      </Provider>
    )
    expect(component.find('.competence .accordion').length).toBe(1)
  })

  it('can complete section', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'No' }
        },
        Consultation: {
          Consulted: { value: 'No' }
        },
        Diagnoses: {
          Diagnosed: { value: 'Yes' },
          DidNotConsult: { value: 'No' },
          InTreatment: { value: 'No' }
        },
        Hospitalization: {
          Hospitalized: { value: 'No' }
        },
        ExistingConditions: {
          HasCondition: { value: 'No' },
          ReceivedTreatment: { value: 'Decline' }
        }
      }
    }
    const store = mockStore({
      application: appState,
    })
    const component = mount(
      <Provider store={store}>
        <Psychological subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
    expect(component.find('.competence .accordion').length).toBe(0)
    expect(component.find('.consultation .accordion').length).toBe(0)
    expect(component.find('.hospitalizations .accordion').length).toBe(0)
    expect(component.find('.diagnoses .accordion').length).toBe(1)
    expect(component.find('.existingconditions .accordion').length).toBe(0)
    expect(component.find('textarea#DidNotFollowExplanation').length).toBe(0)
  })

  it('renders existing conditions', () => {
    const appState = {
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'No' }
        },
        Consultations: {
          Consulted: { value: 'No' }
        },
        Diagnoses: {
          Diagnosed: { value: 'No' }
        },
        Hospitalizations: {
          Hospitalized: { value: 'No' }
        },
        ExistingConditions: {
          HasCondition: { value: 'No' }
        }
      }
    }
    const store = mockStore({
      application: appState
    })
    const component = mount(
      <Provider store={store}>
        <Psychological subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
    expect(component.find('.existingconditions').length).toBe(1)
  })
})
