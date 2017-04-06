import React from 'react'
import { mount } from 'enzyme'
import Hospitalizations from './Hospitalizations'

describe('The Hospitalizations component', () => {
  it('Renders without errors', () => {
    const component = mount(<Hospitalizations />)
    expect(component.find('.hospitalizations').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Hospitalizations onUpdate={onUpdate} />)
    component.find('.hospitalizations .yes input').simulate('change')
    expect(component.find('.hospitalization').length).toBe(1)
    component.find({type: 'radio', value: 'Voluntary'}).simulate('change')
    expect(updates).toBe(2)
  })
})
