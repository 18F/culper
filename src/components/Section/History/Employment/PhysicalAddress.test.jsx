import React from 'react'
import { mount } from 'enzyme'
import PhysicalAddress from './PhysicalAddress'

describe('The employment physical address component', () => {
  it('loads component', () => {
    const component = mount(<PhysicalAddress name="address" />)
    expect(component.find('.has-different').length).toBe(0)
  })

  it('selects yes then no to having different address', () => {
    let counter = 0
    let expected = {
      onUpdate: () => {
        counter++
      }
    }

    const component = mount(<PhysicalAddress name="ac" onUpdate={expected.onUpdate} onBlur={expected.onBlur} onFocus={expected.onFocus} />)
    const selected = component.find('.has-different-address .yes input')
    selected.simulate('change')
    expect(component.find('.has-different').length).toBeGreaterThan(0)
    expect(counter).toBe(1)
    component.find('.has-different-address .no input').simulate('change')
    expect(component.find('.has-different').length).toBe(0)
  })

  it('loads data', () => {
    let counter = 0
    const expected = {
      onUpdate: () => {
        counter++
      },
      name: 'ac',
      address: {
        address: '1234 Some Rd'
      },
      HasDifferentAddress: { value: 'Yes' }
    }

    const component = mount(<PhysicalAddress {...expected} />)
    expect(component.find('.has-different').length).toBeGreaterThan(0)
    let street = component.find('.mailing input').first()
    street.simulate('change')
    street.simulate('blur')
    expect(counter).toBe(1)
  })
})
