import React from 'react'
import { mount } from 'enzyme'
import Order from './Order'

describe('The Order component', () => {
  it('Renders without errors', () => {
    const component = mount(<Order />)
    expect(component.find('.order').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Order onUpdate={onUpdate} />)
    expect(component.find('.order').length).toBe(1)
    component.find('.datecontrol .year input').first().simulate('change', { target: { value: '2010' } })
    component.find('input[name="CourtName"]').simulate('change')
    component.find('input[name="address"]').simulate('change')
    component.find('input[name="Disposition"]').simulate('change')
    component.find('.appeals .no input').simulate('change')
    expect(updates).toBe(5)
  })
})
