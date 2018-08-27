import React from 'react'
import { mount } from 'enzyme'
import MembershipOverthrowItem from './MembershipOverthrowItem'

describe('The legal associations membership overthrow item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<MembershipOverthrowItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-overthrow-organization input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-positions input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-positions-na .block label input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-contributions-na .block label input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
