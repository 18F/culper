import React from 'react'
import { mount } from 'enzyme'
import Consultation from './Consultation'

describe('The Consultation component', () => {
  it('Renders without errors', () => {
    const component = mount(<Consultation />)
    expect(component.find('.consultation').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Consultation onUpdate={onUpdate} />)
    component.find('.consultation .yes input').simulate('change')
    component.find('input[name="CourtName"]').simulate('change')
    expect(updates).toBe(5)
  })
})
