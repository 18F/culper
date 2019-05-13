import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'

// Use SF86 for now since it's a superset of all form sections.
// These tests should be moved into each component.
import { FLAT_SF86 } from 'config/formTypes'

import Section from './Section'
import { testSnapshot } from '../test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () => (
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID'),
  })
))

describe('The section component', () => {
  const mockStore = configureMockStore()

  it('is visible', () => {
    const store = mockStore({
      application: {
        Settings: {
          formType: 'SF86',
        },
      },
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/identification/intro']}>
        <Provider store={store}>
          <Section />
        </Provider>
      </MemoryRouter>,
    )
    expect(component.find('div').length > 0).toBe(true)
  })

  describe('renders', () => {
    FLAT_SF86.forEach((section) => {
      const store = mockStore({
        authentication: {
          authenticated: true,
          token: 'fake-token',
        },
        section: {
          subsection: section.name,
        },
        application: {
          Identification: {},
          History: {},
          Relationships: {},
          Citizenship: {},
          Military: {
            History: {
              HasServed: {
                value: 'Yes',
              },
            },
          },
          Foreign: {
            Passport: { HasPassports: { value: 'No' } },
          },
          Financial: {},
          Substance: {},
          Legal: {},
          Psychological: {
            Competence: { IsIncompetent: { value: 'No' } },
            Consultations: { Consulted: { value: 'No' } },
            Diagnoses: { Diagnosed: { value: 'No' } },
            Hospitalizations: { Hospitalized: { value: 'No' } },
          },
          Settings: {
            formType: 'SF86',
          },
          Errors: {},
          Completed: {},
        },
      })

      it(`${section.key}`, () => {
        testSnapshot(
          <Provider store={store}>
            <MemoryRouter initialEntries={[section.fullPath]}>
              <Section />
            </MemoryRouter>
          </Provider>,
        )
      })
    })
  })
})
