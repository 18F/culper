import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Relationships from './Relationships'

const applicationState = {
  Relationships: {}
}

describe('The family and friends section', () => {
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
        <Relationships />
      </Provider>
    )
    expect(component.find('div').length).toEqual(0)
    window.token = 'fake-token'
  })

  it('visible when authenticated', () => {
    const store = mockStore({
      authentication: { authenticated: true, application: applicationState }
    })
    const component = mount(
      <Provider store={store}>
        <Relationships />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can review all subsections', () => {
    const store = mockStore({ authentication: { authenticated: true } })
    const component = mount(
      <Provider store={store}>
        <Relationships subsection="review" />
      </Provider>
    )
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['marital', 'friends', 'relatives', 'review']
    const store = mockStore({ authentication: { authenticated: true } })

    sections.forEach(section => {
      const component = mount(
        <Provider store={store}>
          <Relationships subsection={section} />
        </Provider>
      )
      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })
})
