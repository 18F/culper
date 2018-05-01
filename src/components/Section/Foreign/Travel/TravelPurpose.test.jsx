import React from 'react'
import { mount } from 'enzyme'
import TravelPurpose from './TravelPurpose'

describe('The travel purpose component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      values: ['Business'],
      onUpdate: () => { updates++ }
    }
    const component = mount(<TravelPurpose {...expected} />)
    component.find('.purpose-business input').simulate('change')
    component.find('.purpose-volunteer input').simulate('change')
    expect(updates).toBe(2)
  })
})
