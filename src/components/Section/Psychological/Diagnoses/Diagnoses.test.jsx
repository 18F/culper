import React from 'react'
import { mount } from 'enzyme'
import Diagnoses from './Diagnoses'

describe('The Diagnoses component', () => {
  it('Renders without errors', () => {
    const component = mount(<Diagnoses />)
    expect(component.find('.diagnoses').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Diagnoses onUpdate={onUpdate} />)
    component.find('.diagnosed .yes input').simulate('change')
    component.find('.didnotconsult .yes input').simulate('change')
    component.find('.intreatment .yes input').simulate('change')
    expect(updates).toBe(5)
  })
})
