import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Psychological from 'components/Section/Psychological/Psychological'

describe('The psych section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/psychological/review']}>
        <Provider store={store}>
          <Psychological subsection="review" />
        </Provider>
      </MemoryRouter>
    )

    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can update review section', () => {
    const appState = {
      Errors: {},
      Completed: {},
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'Yes' },
        },
      },
      Settings: {
        formType: 'SF86',
      },
    }

    const store = mockStore({
      application: appState,
      form: {
        PSYCHOLOGICAL_COMPETENCE: { data: { IsIncompetent: { value: 'Yes' } } },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/psychological/review']}>
        <Provider store={store}>
          <Psychological subsection="review" />
        </Provider>
      </MemoryRouter>
    )
    expect(component.find('.competence .accordion').length).toBe(1)
  })

  it('can complete section', () => {
    const appState = {
      Errors: {},
      Completed: {},
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'No' },
        },
        Consultation: {
          Consulted: { value: 'No' },
        },
        Diagnoses: {
          Diagnosed: { value: 'Yes' },
          DidNotConsult: { value: 'No' },
          InTreatment: { value: 'No' },
        },
        Hospitalization: {
          Hospitalized: { value: 'No' },
        },
        ExistingConditions: {
          HasCondition: { value: 'No' },
          ReceivedTreatment: { value: 'Decline' },
        },
      },
      Settings: {
        formType: 'SF86',
      },
    }

    const store = mockStore({
      application: appState,
      form: {
        PSYCHOLOGICAL_COMPETENCE: { data: { IsIncompetent: { value: 'No' } } },
        PSYCHOLOGICAL_CONSULTATIONS: { data: { Consulted: { value: 'No' } } },
        PSYCHOLOGICAL_DIAGNOSES: {
          data: {
            Diagnosed: { value: 'Yes' },
            DidNotConsult: { value: 'No' },
            InTreatment: { value: 'No' },
          },
        },
        PSYCHOLOGICAL_HOSPITALIZATIONS: { data: { Hospitalized: { value: 'No' } } },
        PSYCHOLOGICAL_CONDITIONS: {
          data: {
            HasCondition: { value: 'No' },
            ReceivedTreatment: { value: 'Decline' },
          },
        },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/psychological/review']}>
        <Provider store={store}>
          <Psychological subsection="review" />
        </Provider>
      </MemoryRouter>
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
      Errors: {},
      Completed: {},
      Psychological: {
        Competence: {
          IsIncompetent: { value: 'No' },
        },
        Consultations: {
          Consulted: { value: 'No' },
        },
        Diagnoses: {
          Diagnosed: { value: 'No' },
        },
        Hospitalizations: {
          Hospitalized: { value: 'No' },
        },
        ExistingConditions: {
          HasCondition: { value: 'No' },
        },
      },
      Settings: {
        formType: 'SF86',
      },
    }

    const store = mockStore({
      application: appState,
      form: {
        PSYCHOLOGICAL_COMPETENCE: { data: { IsIncompetent: { value: 'No' } } },
        PSYCHOLOGICAL_CONSULTATIONS: { data: { Consulted: { value: 'No' } } },
        PSYCHOLOGICAL_DIAGNOSES: { data: { Diagnosed: { value: 'No' } } },
        PSYCHOLOGICAL_HOSPITALIZATIONS: { data: { Hospitalized: { value: 'No' } } },
        PSYCHOLOGICAL_CONDITIONS: {
          data: {
            HasCondition: { value: 'No' },
          },
        },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/psychological/review']}>
        <Provider store={store}>
          <Psychological subsection="review" />
        </Provider>
      </MemoryRouter>
    )

    expect(component.find('div').length).toBeGreaterThan(0)
    expect(component.find('.existingconditions').length).toBe(1)
  })
})
