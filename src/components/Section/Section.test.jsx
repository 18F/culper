import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Section from './Section'
import { mount } from 'enzyme'
import { testSnapshot } from '../test-helpers'
import navigation from '../../config/navigation'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

describe('The section component', () => {
  const mockStore = configureMockStore()

  it('is visible', () => {
    const component = mount(
      <MemoryRouter>
        <Section />
      </MemoryRouter>
    )
    expect(component.find('div').length > 0).toBe(true)
  })

  navigation.forEach(section => {
    if (section.exclude) {
      return
    }
    section.subsections.forEach(subsection => {
      window.token = 'fake-token'
      it(`renders ${section.url}.${subsection.url}`, () => {
        const store = mockStore({
          authentication: { authenticated: true, token: 'fake-token' }
        })
        testSnapshot(
          <Provider store={store}>
            <MemoryRouter>
              <Section section={section.url} subsection={subsection.url} />
            </MemoryRouter>
          </Provider>
        )
      })
    })
  })
})
