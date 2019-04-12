import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import { testSnapshot } from 'components/test-helpers'
import App from 'components/Main/App'

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../Form/ValidationElement/helpers', () => (
  Object.assign(require.requireActual('../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID'),
  })
))

describe('App component', () => {
  const mockStore = configureMockStore()

  describe('for the SF86', () => {
    const store = mockStore({
      authentication: { formType: 'SF86' },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          mobileNavigation: false,
        },
      },
    })

    it('renders the form name title', () => {
      const component = mount(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )

      expect(component.find('.eapp-logo-text').length).toEqual(1)
      expect(component.find('.eapp-logo-text').text()).toEqual('SF86')
    })

    it('renders the homepage', () => {
      testSnapshot(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    })
  })

  describe('for the SF85', () => {
    const store = mockStore({
      authentication: { formType: 'SF85' },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          mobileNavigation: false,
        },
      },
    })

    it('renders the form name title', () => {
      const component = mount(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )

      expect(component.find('.eapp-logo-text').length).toEqual(1)
      expect(component.find('.eapp-logo-text').text()).toEqual('SF85')
    })

    it('renders the homepage', () => {
      testSnapshot(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    })
  })

  describe('for the SF85P', () => {
    const store = mockStore({
      authentication: { formType: 'SF85P' },
      application: {
        Errors: {},
        Completed: {},
        Settings: {
          mobileNavigation: false,
        },
      },
    })

    it('renders the form name title', () => {
      const component = mount(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )

      expect(component.find('.eapp-logo-text').length).toEqual(1)
      expect(component.find('.eapp-logo-text').text()).toEqual('SF85P')
    })

    it('renders the homepage', () => {
      testSnapshot(
        <MemoryRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      )
    })
  })
})
