import React from 'react'
import { mount } from 'enzyme'
import TerroristOrganizationItem from './TerroristOrganizationItem'

describe('The legal associations terrorist organization item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<TerroristOrganizationItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-terrorist-organization input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-positions input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-positions-na .block label input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-contributions-na .block label input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
