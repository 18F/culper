import React from 'react'
import { mount } from 'enzyme'
import Conferences from './Conferences'

describe('The foreign business conferences component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Conferences {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Conferences {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(3)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-conferences',
      HasForeignConferences: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Conferences {...expected} />)
    component.find('.branch .yes input').at(0).simulate('change')
    component.find('.branch .yes input').at(0).simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-conferences',
      HasForeignConferences: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Conferences {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.conferences-description textarea').simulate('change')
    component.find('.conferences-sponsor input').simulate('change')
    component.find('.conferences-city input').simulate('change')
    component.find('.conferences-country input').simulate('change')
    component.find('.conferences-dates .to .day input').simulate('change')
    component.find('.conferences-purpose textarea').simulate('change')
    component.find('.has-foreign-contacts .yes input').simulate('change')
    component.find('.conferences-explanation textarea').simulate('change')
    expect(updates).toBe(8 * 2)
  })
})
