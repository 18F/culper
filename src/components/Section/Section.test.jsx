import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Section from './Section'
import { mount } from 'enzyme'
import { testSnapshot } from '../test-helpers'
import navigationSections from './../Main/navigationSections'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

const shouldSkip = (section, subsection) => {
  return (
    section.exclude ||
    // these need special handling, which we will come back to
    (section.url === 'foreign' && subsection.url === 'activities') ||
    (section.url === 'substance' && subsection.url === 'drugs') ||
    (section.url === 'substance' && subsection.url === 'alcohol') ||
    (section.url === 'psychological' && subsection.url === 'review')
  )
}

describe('The section component', () => {
  const mockStore = configureMockStore()

  it('is visible', () => {
    const component = mount(
      <MemoryRouter>
        <Section
          navigation={{
            sections: navigationSections('86')
          }}
        />
      </MemoryRouter>
    )
    expect(component.find('div').length > 0).toBe(true)
  })

  navigationSections('86').forEach(section => {
    section.subsections.forEach(subsection => {
      if (shouldSkip(section, subsection)) {
        return
      }
      window.token = 'fake-token'
      it(`renders ${section.url}.${subsection.url}`, () => {
        const store = mockStore({
          authentication: { authenticated: true, token: 'fake-token' }
        })
        testSnapshot(
          <Provider store={store}>
            <MemoryRouter>
              <Section
                section={section.url}
                subsection={subsection.url}
                navigation={{
                  sections: navigationSections('86')
                }}
              />
            </MemoryRouter>
          </Provider>
        )
      })
    })
  })
})
