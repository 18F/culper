import React from 'react'
import { mount } from 'enzyme'
import ContactItem from './ContactItem'

describe('The contact item component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<ContactItem {...expected} />)
    component.find('.foreign-business-contact-name .first input').simulate('change')
    component.find('.foreign-business-contact-location .yes input').simulate('change')
    component.find('.foreign-business-contact-date .day input').simulate('change')
    component.find('.foreign-business-contact-establishment textarea').simulate('change')
    component.find('.foreign-business-contact-representatives textarea').simulate('change')
    component.find('.foreign-business-contact-purpose textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
