import React from 'react'
import { mount } from 'enzyme'
import { Logout } from 'components/Navigation/Logout'

jest.mock('services')
jest.mock('config')

describe('The Logout component', () => {
  const component = mount(<Logout />)

  it('renders without errors', () => {
    expect(component.exists()).toBe(true)
  })

  describe('without SAML', () => {
    const componentBasic = mount(<Logout />)

    it('renders a Logout button', () => {
      componentBasic.setState({ saml: false })
      expect(componentBasic.find('button.logout').length).toBe(1)
    })
  })

  describe('with SAML', () => {
    const componentSAML = mount(<Logout />)
    componentSAML.setState({ saml: { URL: 'test', Base64XML: 'test' } })

    it('renders the SAML logout button', () => {
      expect(componentSAML.find('#saml').length).toBe(1)
    })
  })
})
