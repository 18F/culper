import React from 'react'
import { mount } from 'enzyme'
import Ventures from './Ventures'

describe('The foreign business ventures component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-ventures',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Ventures {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-ventures',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Ventures {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-ventures',
      HasForeignVentures: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Ventures {...expected} />)
    component.find('.branch .yes input').simulate('change')
    component.find('.branch .yes input').simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-ventures',
      HasForeignVentures: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Ventures {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.ventures-name .first input').simulate('change')
    component.find('.ventures-address .mailing input').simulate('change')
    component.find('.ventures-citizenship input').simulate('change')
    component.find('.ventures-description textarea').simulate('change')
    component.find('.ventures-relationship textarea').simulate('change')
    component.find('.ventures-dates .to .day input').simulate('change')
    component.find('.ventures-association textarea').simulate('change')
    component.find('.ventures-position input').simulate('change')
    component.find('.ventures-service input').simulate('change')
    component.find('.ventures-compensation textarea').simulate('change')
    expect(updates).toBe(10)
  })
})
