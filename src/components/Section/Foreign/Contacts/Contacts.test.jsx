import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Contacts from './Contacts'

describe('The contacts component', () => {
  const mockStore = configureMockStore()
  const defaultAppState = {
    application: {
      AddressBooks: {}
    }
  }
  let createComponent

  beforeEach(() => {
    const store = mockStore(defaultAppState)
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Contacts {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Name: {} } }] }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })
})
