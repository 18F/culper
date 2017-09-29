import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { api } from '../../services'
import { Provider } from 'react-redux'
import TwoFactor from './TwoFactor'
import { shallow, mount } from 'enzyme'

describe('The two factor authenictaction component', () => {
  // Setup
  const mockProxy = new MockAdapter(api.proxy)
  const mockProxySecured = new MockAdapter(api.proxySecured)
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)
  const store = mockStore({ authentication: [] })

  mockProxy.onGet('/2fa/test').reply(200, 'my-fake-base64')
  mockProxySecured.onPost('/2fa/test/verify').reply(200, '')
  api.setToken('my-token')

  it('does not render if turned off', () => {
    const props = {
      username: 'test',
      mfa: {
        enabled: false,
        resettable: false
      }
    }
    const component = mount(<Provider store={store}><TwoFactor {...props} /></Provider>)
    expect(component.find('img').length).toEqual(0)
    expect(component.find('input[type="text"]').length).toEqual(0)
    expect(component.find('button').length).toEqual(0)
  })

  it('renders with QR code if user is not verified', () => {
    const props = {
      username: 'test',
      qrcode: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      mfa: {
        enabled: true,
        resettable: false
      }
    }
    const store2 = mockStore({ authentication: { qrcode: props.qrcode } })
    const component = mount(<Provider store={store2}><TwoFactor {...props} /></Provider>)
    expect(component.find('img').length).toEqual(1)
    expect(component.find('input[type="text"]').length).toEqual(1)
    expect(component.find('button').length).toEqual(1)
  })

  it('renders token reset if enabled', () => {
    const props = {
      username: 'test',
      mfa: {
        enabled: true,
        resettable: true
      }
    }
    const component = mount(<Provider store={store}><TwoFactor {...props} /></Provider>)
    expect(component.find('img').length).toEqual(0)
    expect(component.find('input[type="text"]').length).toEqual(1)
    expect(component.find('button').length).toEqual(1)
    expect(component.find('.reset').length).toEqual(1)
    component.find('.reset').simulate('click')
  })

  it('handles events', () => {
    const props = {
      error: 'test error',
      username: 'test',
      code: '123456',
      mfa: {
        enabled: true,
        resettable: true
      }
    }
    const store2 = mockStore({ authentication: { token: props.code } })
    const component = mount(<Provider store={store2}><TwoFactor {...props} /></Provider>)
    component.find('.reset').simulate('click')
    component.find('input').simulate('change', { event: { target: { value: '7' } } })
    component.find('button').simulate('click')
  })
})
