import React from 'react'
import { mount } from 'enzyme'
import TravelItem from './TravelItem'

describe('The travel item component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'travelItem',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<TravelItem {...expected} />)
    component
      .find('.travel-item-country .country input')
      .simulate('change', {
        target: { name: 'Country', value: 'United States' }
      })
    component.find('.travel-item-dates .to .year input').simulate('change')
    expect(updates).toBe(2)
  })
})
