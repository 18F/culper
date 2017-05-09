import React from 'react'
import { mount } from 'enzyme'
import Support from './Support'

describe('The foreign activities support component', () => {
  it('display nothing when "no" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-activities-support',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Support {...expected} />)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    let updates = 0
    const expected = {
      name: 'foreign-activities-support',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Support {...expected} />)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: 'Yes',
      onValidate: () => { validated = true }
    }
    const component = mount(<Support {...expected} />)
    component.find('.branch .yes input').simulate('change')
    component.find('.branch .yes input').simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Support {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.foreign-activities-support-name .first input').simulate('change')
    component.find('.foreign-activities-support-address .mailing input').simulate('change')
    component.find('.foreign-activities-support-relationship textarea').simulate('change')
    component.find('.foreign-activities-support-amount input').simulate('change')
    component.find('.foreign-activities-support-frequency input').simulate('change')
    component.find('.foreign-activities-support-citizenship input').simulate('change')
    expect(updates).toBe(6)
  })
})
