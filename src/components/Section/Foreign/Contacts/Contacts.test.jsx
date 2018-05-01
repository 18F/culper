import React from 'react'
import { mount } from 'enzyme'
import Contacts from './Contacts'

describe('The contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'No' }
    }
    const component = mount(<Contacts {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-contacts',
      HasForeignContacts: { value: 'Yes' },
      List: { branch: {}, items: [{ Item: { Name: {} } }]}
    }
    const component = mount(<Contacts {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })
})
