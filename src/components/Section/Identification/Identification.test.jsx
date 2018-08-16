import React from 'react'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Identification, { IdentificationSections } from './Identification'
import { mount } from 'enzyme'
import navigation from './navigation'

const applicationState = {
  Identification: {
    Contacts: {
      Emails: { items: [] },
      PhoneNumbers: { items: [] }
    }
  }
}

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

  navigation.subsections.forEach(subsection => {
    it(`renders the Identification component for the ${
      subsection.url
    } subsection`, () => {
      const store = mockStore({
        authentication: { authenticated: true },
        application: applicationState
      })
      const component = renderer.create(
        <Provider store={store}>
          <Identification subsection={subsection.url} />
        </Provider>
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  it('renders the IdentificationSections component', () => {
    const component = renderer.create(<IdentificationSections />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
