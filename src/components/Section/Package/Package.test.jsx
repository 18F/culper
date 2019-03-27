import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Package from './Package'

const applicationState = {
  Identification: {},
  Completed: {
    identification: [
      {
        code: 'identification/name',
        section: 'identification',
        subsection: 'name',
        valid: false,
      },
    ],
  },
  Psychological: {
    Competence: { IsIncompetent: { value: 'No' } },
    Consultations: { Consulted: { value: 'No' } },
    Diagnoses: { Diagnosed: { value: 'No' } },
    Hospitalizations: { Hospitalized: { value: 'No' } },
    ExistingConditions: { HasCondition: { value: 'No' } },
  },
}

describe('The Package form component', () => {
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('visible when authenticated', () => {
    window.token = 'fake-token'
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState,
    })
    const component = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Package Application={applicationState} />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})
