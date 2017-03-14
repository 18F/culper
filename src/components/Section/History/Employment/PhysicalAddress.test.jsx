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
    const selected = component.find({type: 'radio', name: 'physicalAddress', value: 'Yes'})
    selected.simulate('change')
    expect(component.find('.has-different').length).toBeGreaterThan(0)
    expect(counter).toBe(1)
    component.find({type: 'radio', name: 'physicalAddress', value: 'No'}).simulate('change')
    expect(component.find('.has-different').length).toBe(0)
  })

  it('loads data', () => {
    let counter = 0
    let blur = 0
    let focus = 0
    let expected = {
      onUpdate: () => {
        counter++
      },
      onBlur: () => {
        blur++
      },
      onFocus: () => {
        focus++
      },
      address: {
        address: '1234 Some Rd'
      }
    }

    const component = mount(<PhysicalAddress name="ac" onUpdate={expected.onUpdate} onBlur={expected.onBlur} onFocus={expected.onFocus} HasDifferentAddress="Yes" Address={expected.address} />)
    expect(component.find('.has-different').length).toBeGreaterThan(0)
    let street = component.find('.mailing input').first()
    street.simulate('change')
    street.simulate('focus')
    street.simulate('blur')
    expect(counter).toBe(1)
    expect(blur).toBe(1)
    expect(focus).toBe(1)
  })
})
