import React from 'react'
import { mount } from 'enzyme'
import SupportItem from './SupportItem'

describe('The SupportItem component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-activities-support',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<SupportItem {...expected} />)
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
      .find('.foreign-activities-support-amount-estimated input')
      .simulate('change')
    component
      .find('.foreign-activities-support-frequency input')
      .simulate('change')
    component
      .find('.foreign-activities-support-citizenship input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-activities-support-citizenship input')
      .simulate('keydown', { keyCode: 13, target: { value: 'United States' } })
    expect(updates).toBe(7)
  })
})
