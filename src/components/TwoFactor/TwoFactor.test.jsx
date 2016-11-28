import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../../services'
import TwoFactor from './TwoFactor'
import { shallow } from 'enzyme'

describe('The two factor authenictaction component', () => {
  // Setup
  const mockProxy = new MockAdapter(api.proxy)
  const mockProxySecured = new MockAdapter(api.proxySecured)

  mockProxy.onGet('/2fa').reply(200, 'my-fake-base64')
  mockProxySecured.onPost('/2fa/verify').reply(200, '')
  api.setToken('my-token')

  it('renders with QR code if user is not verified', () => {
    const component = shallow(<TwoFactor />)
    expect(component.find('img').length).toEqual(1)
    expect(component.find('input[type="text"]').length).toEqual(1)
    expect(component.find('button').length).toEqual(1)
  })

  it('asks for token only if user is already verified for two-factor authentication', () => {
    const component = shallow(<TwoFactor isVerified="true" />)
    expect(component.find('input[type="text"]').length).toEqual(1)
    expect(component.find('button').length).toEqual(1)
  })
})
