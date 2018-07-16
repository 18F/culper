import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ReduxConsent, { Consent } from './Consent'

describe('The Consenst component', () => {
  window.token = 'fake-token'

  it('dispatch fired on "I agree"', () => {
    let dispatched = 0
    const props = {
      dispatch: () => { dispatched++ }
    }
    const component = mount(<Consent {...props} />)
    expect(component.find('button').length).toBe(1)
    component.find('button').simulate('click')
    expect(dispatched).toBe(1)
  })

  it('hidden if previously consented', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {
        authenticated: true
      },
      application: {
        Settings: {
          consented: 'Yes'
        }
      }
    })
    const component = mount(<Provider store={store}><ReduxConsent /></Provider>)
    expect(component.find('.consent-acceptance').length).toBe(0)
    expect(component.find('.modal').length).toBe(0)
  })

  it('display if no consent given', () => {
    window.token = ''
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const store = mockStore({
      authentication: {},
      application: {
        Settings: {
          consented: ''
        }
      }
    })
    const component = mount(<Provider store={store}><ReduxConsent /></Provider>)
    expect(component.find('.consent-acceptance').length).toBe(1)
    window.token = 'fake-token'
  })
})
