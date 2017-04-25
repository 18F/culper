import React from 'react'
import { mount } from 'enzyme'
import MultipleDropdown from './MultipleDropdown'

describe('The MultipleDropdown component', () => {
  it('can autotab forward', () => {
    let updates = 0
    const expected = {
      name: 'multiple-dropdown',
      onUpdate: () => { updates++ }
    }
    const component = mount(<MultipleDropdown {...expected} />)
    component.find('input').simulate('change', { target: { value: 'United States' } })
    expect(updates).toBe(1)
  })
})
