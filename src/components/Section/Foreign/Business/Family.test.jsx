import React from 'react'
import { mount } from 'enzyme'
import Family from './Family'

describe('The foreign business family component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Family {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Family {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(3)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: 'Yes',
      onError: (value, arr) => {
        validated = true
        return arr
      }
    }
    const component = mount(<Family {...expected} />)
    component.find('.branch .yes input').at(0).simulate('change')
    component.find('.branch .yes input').at(0).simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Family {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.family-name .first input').simulate('change')
    component.find('.family-agency input').simulate('change')
    component.find('.family-country input').simulate('change')
    component.find('.family-date .day input').simulate('change')
    component.find('.family-circumstances textarea').simulate('change')
    expect(updates).toBe(5 * 2)
  })
})
