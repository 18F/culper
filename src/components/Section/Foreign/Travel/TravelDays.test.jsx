import React from 'react'
import { mount } from 'enzyme'
import TravelDays from './TravelDays'

describe('The travel days component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      values: ['1-5'],
      onUpdate: () => { updates++ }
    }
    const component = mount(<TravelDays {...expected} />)
    component.find('.days-1-5 input').simulate('change')
    component.find('.days-11-20 input').simulate('change')
    expect(updates).toBe(2)
  })
})
