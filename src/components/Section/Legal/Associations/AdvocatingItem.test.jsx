import React from 'react'
import { mount } from 'enzyme'
import AdvocatingItem from './AdvocatingItem'

describe('The legal associations advocating in terrorism item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<AdvocatingItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-advocating-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-advocating-dates .from .year input')
      .simulate('change')
    expect(updates).toBe(2)
  })
})
