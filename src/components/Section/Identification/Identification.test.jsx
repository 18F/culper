import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Identification, { IdentificationSections } from './Identification'
import { mount } from 'enzyme'
import navigation from './navigation'
import { testSectionSnapshots, testSnapshot } from '../../test-helpers'

const applicationState = {
  Identification: {
    Contacts: {
      Emails: { items: [] },
      PhoneNumbers: { items: [] }
    }
  }
}

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () =>
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID')
  })
)

describe('The identification section', () => {
  // Setup
  window.token = 'fake-token'
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    window.token = ''
    const store = mockStore({
      authentication: [],
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Identification />
      </Provider>
    )
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Identification />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    const component = mount(
      <Provider store={store}>
        <Identification subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['name', 'birthdate', 'birthplace', 'ssn']
    const store = mockStore({ authentication: { authenticated: true } })

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Identification subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  {
    const store = mockStore({
      authentication: { authenticated: true },
      application: applicationState
    })
    testSectionSnapshots(navigation, store, Identification)
  }

  it('renders the IdentificationSections component', () => {
    testSnapshot(<IdentificationSections />)
  })
})
