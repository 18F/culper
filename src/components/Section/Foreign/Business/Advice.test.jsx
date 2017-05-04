import React from 'react'
import { mount } from 'enzyme'
import Advice from './Advice'

describe('The foreign business advice component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Advice {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Advice {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Advice {...expected} />)
    component.find('.branch .yes input').simulate('change')
    component.find('.branch .yes input').simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      HasForeignAdvice: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Advice {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.advice-description textarea').simulate('change')
    component.find('.advice-name .first input').simulate('change')
    component.find('.advice-organization input').simulate('change')
    component.find('.advice-country input').simulate('change')
    component.find('.advice-dates .to .day input').simulate('change')
    component.find('.advice-compensation textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
