import React from 'react'
import { mount } from 'enzyme'
import MembershipViolenceItem from './MembershipViolenceItem'

describe('The legal associations membership violence item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<MembershipViolenceItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-violence-organization input')
      .simulate('change')
    component
      .find('.legal-associations-violence-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-violence-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-violence-positions input')
      .simulate('change')
    component
      .find('.legal-associations-violence-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-violence-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-violence-positions-na .block label input')
      .simulate('change')
    component
      .find('.legal-associations-violence-contributions-na .block label input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
