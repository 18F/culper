import React from 'react'
import { mount } from 'enzyme'
import CoOwner from './CoOwner'

describe('The CoOwner component', () => {
  it('Renders without errors', () => {
    const component = mount(<CoOwner />)
    expect(component.find('.co-owner').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    // Start with countries so we don't have to worry about simulating multi-select
    const countries = {
      value: ['Germany']
    }
    const component = mount(
      <CoOwner onUpdate={onUpdate} Countries={countries} />
    )
    expect(component.find('.co-owner').length).toBe(1)
    component.find('input[name="first"]').simulate('change')
    component.find('input[name="street"]').simulate('change')

    // Delete country to trigger update
    component.find('.token-delete').simulate('click')
    component.find('textarea[name="RelationshipNature"]').simulate('change')
    expect(updates).toBe(4)
  })
})
