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
  const mockProxy = new MockAdapter(api.proxy),
        mockProxySecured = new MockAdapter(api.proxySecured),
        middlewares = [ thunk ],
        mockStore = configureMockStore(middlewares),
        store = mockStore({ authentication: [] })

  mockProxy.onGet('/2fa/test').reply(200, 'my-fake-base64')
  mockProxySecured.onPost('/2fa/test/verify').reply(200, '')
  api.setToken('my-token')

  it('renders with QR code if user is not verified', () => {
    const component = mount(<Provider store={store}><TwoFactor username="test" /></Provider>)
    expect(component.find('img').length).toEqual(1)
    expect(component.find('input[type="text"]').length).toEqual(1)
    expect(component.find('button').length).toEqual(1)
  })

  // it('asks for token only if user is already verified for two-factor authentication', () => {
  //   const component = shallow(<Provider store={store}><TwoFactor username="test" isVerified="true" /></Provider>)
  //   expect(component.find('input[type="text"]').length).toEqual(1)
  //   expect(component.find('button').length).toEqual(1)
  // })
})
