import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'

import navigation from 'config/navigation'

import Section from './Section'
import { testSnapshot } from '../test-helpers'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () => (
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID'),
  })
))

const shouldSkip = (section, subsection) => (
  section.exclude
    || (section.url === 'foreign' && subsection.url === 'activities') // these need special handling, which we will come back to
    || (section.url === 'substance' && subsection.url === 'drugs')
    || (section.url === 'substance' && subsection.url === 'alcohol')
    || (section.url === 'psychological' && subsection.url === 'review')
)

describe('The section component', () => {
  const mockStore = configureMockStore({
    authentication: {
      formType: 'SF86',
    },
  })

  it('is visible', () => {
    const component = mount(
      <MemoryRouter>
        <Section />
      </MemoryRouter>,
    )
    expect(component.find('div').length > 0).toBe(true)
  })

  navigation.forEach((section) => {
    section.subsections.forEach((subsection) => {
      if (shouldSkip(section, subsection)) {
        return
      }

      window.token = 'fake-token'

      it(`renders ${section.url}.${subsection.url}`, () => {
        const store = mockStore({
          authentication: {
            authenticated: true,
            token: 'fake-token',
            formType: 'SF86',
          },
          section: { section: section.url, subsection: subsection.url },
          application: {
            Military: {
              History: {
                HasServed: {
                  value: 'Yes',
                },
              },
            },
            Psychological: {
              Competence: { IsIncompetent: { value: 'No' } },
              Consultations: { Consulted: { value: 'No' } },
              Diagnoses: { Diagnosed: { value: 'No' } },
              Hospitalizations: { Hospitalized: { value: 'No' } },
            },
          },
        })

        testSnapshot(
          <Provider store={store}>
            <MemoryRouter initialEntries={[`/form/${section.url}/${subsection.url}`]}>
              <Section section={section.url} subsection={subsection.url} />
            </MemoryRouter>
          </Provider>,
        )
      })
    })
  })
})
