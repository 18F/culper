import React from 'react'
import { mount } from 'enzyme'
import PrescriptionUse from './PrescriptionUse'

describe('The PrescriptionUse component', () => {
  it('Renders without errors', () => {
    const component = mount(<PrescriptionUse />)
    expect(component.find('.prescription-use').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<PrescriptionUse onUpdate={onUpdate} />)
    expect(component.find('.prescription-use').length).toBe(1)
    component.find('.involvement-dates .from .year input').simulate('change')
    component.find('.prescription-name input').simulate('change')
    component.find('.reason textarea').simulate('change')
    component.find('.use-while-employed .yes input').simulate('change')
    component.find('.use-with-clearance .yes input').simulate('change')
    expect(updates).toBe(5)
  })
})
