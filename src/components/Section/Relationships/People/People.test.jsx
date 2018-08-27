import React from 'react'
import { mount } from 'enzyme'
import People from './People'

describe('The relative alias component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'people'
    }

    const component = mount(<People {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'people',
      List: {
        items: [{ Item: { Relationship: { values: ['Other'] } } }]
      },
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<People {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
    component
      .find('.known-dates .from .month input')
      .simulate('change', { target: { value: '10' } })
    component.find('.name input[name="first"]').simulate('change')
    component.find('.rank input').simulate('change')
    component.find('.rank-notapplicable .button input').simulate('change')
    component.find('.mobile-telephone .home input').simulate('change')
    component.find('.other-telephone .home input').simulate('change')
    component.find('.email input[name="Email"]').simulate('change')
    component.find('.email-notapplicable .button input').simulate('change')
    component.find('.address input[name="city"]').simulate('change')
    component
      .find('.relationships input[name="relationship-other"]')
      .simulate('change')
    component.find('.relationship-other input').simulate('change')
    expect(updates).toBe(12)
  })
})
