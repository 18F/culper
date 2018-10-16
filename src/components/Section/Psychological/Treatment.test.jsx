import React from 'react'
import { mount } from 'enzyme'
import Treatment from './Treatment'

describe('The Treatment component', () => {
  it('Renders without errors', () => {
    const component = mount(<Treatment />)
    expect(component.find('.treatment').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<Treatment onUpdate={onUpdate} />)
    expect(component.find('.treatment').length).toBe(1)
    component.find('input[name="Name"]').simulate('change')
    component.find('input[name="street"]').simulate('change')
    component.find('input[name="domestic_first"]').simulate('change')
    expect(updates).toBe(3)
  })
})
