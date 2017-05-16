import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The foreign business employment component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Employment {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Employment {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(3)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Employment {...expected} />)
    component.find('.branch .yes input').at(0).simulate('change')
    component.find('.branch .yes input').at(0).simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Employment {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .mailing input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(7 * 2)
  })
})
