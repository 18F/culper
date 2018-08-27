import React from 'react'
import { mount } from 'enzyme'
import ActivitiesToOverthrowItem from './ActivitiesToOverthrowItem'

describe('The legal associations engaged in terrorism item component', () => {
  it('can select "yes"', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<ActivitiesToOverthrowItem onUpdate={onUpdate} />)
    component
      .find('.legal-associations-activities-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-activities-dates .from .year input')
      .simulate('change')
    expect(updates).toBe(2)
  })
})
