import React from 'react'
import { mount } from 'enzyme'
import ExistingConditions from './ExistingConditions'

describe('The ExistingConditions component', () => {
  it('Renders without errors', () => {
    const component = mount(<ExistingConditions />)
    expect(component.find('.existingconditions').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<ExistingConditions onUpdate={onUpdate} />)
    //component.find('.diagnosed .yes input').simulate('change')
    //component.find('.didnotconsult .yes input').simulate('change')
    //component.find('.intreatment .yes input').simulate('change')
    //expect(updates).toBe(5)
  })
})
