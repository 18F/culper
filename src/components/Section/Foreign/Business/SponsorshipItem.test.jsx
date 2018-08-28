import React from 'react'
import { mount } from 'enzyme'
import SponsorshipItem from './SponsorshipItem'

describe('The foreign business sponsorship component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      Citizenship: { value: [] },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<SponsorshipItem {...expected} />)
    component
      .find('.foreign-business-sponsorship-name .first input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-birthdate .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-birthdate-na .block label input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-birthplace .yes input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-address .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-citizenship input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-business-sponsorship-citizenship input')
      .simulate('keydown', { keyCode: 13, target: { value: 'United States' } })
    component
      .find('.foreign-business-sponsorship-organization input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-residence .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-stay textarea')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-organizationaddress .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-sponsorship textarea')
      .simulate('change')
    expect(updates).toBe(12)
  })
})
