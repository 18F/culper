import React from 'react'
import { mount } from 'enzyme'
import CoOwners from './CoOwners'

describe('The CoOwners component', () => {
  it('Renders without errors', () => {
    const component = mount(<CoOwners />)
    expect(component.find('.co-owners').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    // Start with countries so we don't have to worry about simulating multi-select
    const countries = {
      value: [{ name: 'Germany', value: 'Germany' }]
    }
    const component = mount(<CoOwners onUpdate={onUpdate} />)
    expect(component.find('.co-owners').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
    component.find('.branch .yes input').simulate('change')
    expect(updates).toBe(2)
  })
})
