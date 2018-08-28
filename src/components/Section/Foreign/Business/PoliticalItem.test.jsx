import React from 'react'
import { mount } from 'enzyme'
import PoliticalItem from './PoliticalItem'

describe('The foreign business political component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<PoliticalItem {...expected} />)
    component
      .find('.foreign-business-political-position input')
      .simulate('change')
    component
      .find('.foreign-business-political-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-political-country input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-business-political-reason textarea')
      .simulate('change')
    component
      .find('.foreign-business-political-eligibility input')
      .simulate('change')
    expect(updates).toBe(5)
  })
})
