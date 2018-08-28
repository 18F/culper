import React from 'react'
import { mount } from 'enzyme'
import VotingItem from './VotingItem'

describe('The foreign business voting item component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<VotingItem {...expected} />)
    component
      .find('.foreign-business-voting-date .day input')
      .simulate('change')
    component
      .find('.foreign-business-voting-country input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-business-voting-reason textarea')
      .simulate('change')
    component
      .find('.foreign-business-voting-eligibility input')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
