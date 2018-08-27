import React from 'react'
import { mount } from 'enzyme'
import PhysicalAddress from './PhysicalAddress'

describe('The employment physical address component', () => {
  it('loads component', () => {
    const component = mount(<PhysicalAddress name="address" />)
    expect(component.find('.has-different').length).toBe(0)
  })

  it('responds to updates', () => {
    let updates = 0
    const expected = {
      HasDifferentAddress: { value: 'Yes' },
      Address: {},
      Telephone: {},
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<PhysicalAddress {...expected} />)
    component.find('.has-different-address .yes input').simulate('change')
    component
      .find('.physical-address-address .street input')
      .at(0)
      .simulate('change')
    component
      .find('.physical-address-telephone .number input')
      .at(0)
      .simulate('change')
    expect(updates).toBe(3)
  })
})
