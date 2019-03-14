import React from 'react'
import { mount } from 'enzyme'
import { Support } from './Support'

describe('The foreign activities support component', () => {
  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: { value: 'No' },
    }
    const component = mount(<Support {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: { value: 'Yes' },
    }
    const component = mount(<Support {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      },
    }
    const component = mount(<Support {...expected} />)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-activities-support',
      HasForeignSupport: { value: 'Yes' },
      List: {
        items: [{}],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = mount(<Support {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component
      .find('.foreign-activities-support-name .first input')
      .simulate('change')
    component
      .find('.foreign-activities-support-address .mailing input')
      .simulate('change')
    component
      .find('.foreign-activities-support-relationship textarea')
      .simulate('change')
    component
      .find('.foreign-activities-support-amount input')
      .simulate('change')
    component
      .find('.foreign-activities-support-frequency input')
      .simulate('change')
    component
      .find('.foreign-activities-support-citizenship input')
      .simulate('change')
    expect(updates).toBe(6)
  })
})
