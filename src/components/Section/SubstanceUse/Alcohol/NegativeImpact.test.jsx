import React from 'react'
import { mount } from 'enzyme'
import NegativeImpact from './NegativeImpact'

describe('The NegativeImpact component', () => {
  it('Renders without errors', () => {
    const component = mount(<NegativeImpact />)
    expect(component.find('.negative-impact').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<NegativeImpact onUpdate={onUpdate} />)
    expect(component.find('.negative-impact').length).toBe(1)
    component
      .find('.occurred .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('textarea[name="Circumstances"]').simulate('change')
    component.find('textarea[name="NegativeImpact"]').simulate('change')
    component
      .find('.used .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    expect(updates).toBe(4)
  })
})
