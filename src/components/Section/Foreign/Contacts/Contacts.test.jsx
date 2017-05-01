import React from 'react'
import { mount } from 'enzyme'
import Contacts from './Contacts'

describe('The contacts component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-contacts',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Contacts {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display accordion when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-contacts',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Contacts {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })
})
