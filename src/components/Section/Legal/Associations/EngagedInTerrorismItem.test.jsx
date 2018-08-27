import React from 'react'
import { mount } from 'enzyme'
import EngagedInTerrorismItem from './EngagedInTerrorismItem'

describe('The legal associations engaged in terrorism item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<EngagedInTerrorismItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-engaged-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-engaged-dates .from .year input')
      .simulate('change')
    expect(updates).toBe(2)
  })
})
