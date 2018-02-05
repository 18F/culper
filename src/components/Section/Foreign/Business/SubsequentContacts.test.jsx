import React from 'react'
import { mount } from 'enzyme'
import SubsequentContacts from './SubsequentContacts'

describe('The foreign business contact subsequent contacts component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-contact-subsequentcontacts',
      items: [{ Item: { Has: { value: 'Yes' } } }],
      onUpdate: () => { updates++ }
    }
    const component = mount(<SubsequentContacts {...expected} />)
    component.find('.foreign-business-contact-subsequent textarea').simulate('change')
    component.find('.foreign-business-contact-recent .day input').simulate('change')
    component.find('.foreign-business-contact-future textarea').simulate('change')
    expect(updates).toBe(3)
  })
})
