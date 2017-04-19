import React from 'react'
import { mount } from 'enzyme'
import Person from './Person'

describe('The relative alias component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'person'
    }

    const component = mount(<Person {...expected} />)
    expect(component.find('.person').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'person',
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<Person {...expected} />)
    expect(component.find('.person').length).toEqual(1)
    component.find('.known-dates .from input#month').simulate('change', { target: { value: '10' } })
    component.find('.name input[name="first"]').simulate('change')
    component.find('.rank input').simulate('change')
    component.find('.rank-notapplicable .button input').simulate('change')
    component.find('.mobile-telephone .home input').simulate('change')
    component.find('.other-telephone .home input').simulate('change')
    component.find('.email input[name="Email"]').simulate('change')
    component.find('.email-notapplicable .button input').simulate('change')
    component.find('.address input[name="city"]').simulate('change')
    expect(updates).toBe(9)
  })
})
