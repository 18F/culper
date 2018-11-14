import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Contacts from './Contacts'

const alternateAddressRenderMock = jest.fn();
const mountComponent = (mockStore, Component, props) => {
  const store = mockStore({ application: { AddressBooks: {} }})
  const finalProps = {
    render: alternateAddressRenderMock,
    ...props
  }

  return mount(
    <Provider store={store}>
      <Component {...finalProps} />
    </Provider>
  )
}

describe('The contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    const mockStore = configureMockStore()
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'No' }
    }
    const component = mountComponent(mockStore, Contacts, expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    const mockStore = configureMockStore()
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Name: {} } }] }
    }
    const component = mountComponent(mockStore, Contacts, expected)
    expect(component.find('.accordion').length).toBe(1)
  })
})
