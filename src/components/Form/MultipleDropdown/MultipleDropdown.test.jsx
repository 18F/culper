import React from 'react'
import { mount } from 'enzyme'
import MultipleDropdown from './MultipleDropdown'

describe('The MultipleDropdown component', () => {
  it('display selected values', () => {
    const expected = {
      name: 'multiple-dropdown',
      value: [{ name: 'United States', value: 'United States' }],
      options: [
        { name: 'United States', value: 'United States' },
        { name: 'Germany', value: 'Germany' }
      ],
      input: 'Uni'
    }
    const component = mount(<MultipleDropdown {...expected} />)
    expect(component.find('.ic-token').length).toBe(1)
  })

  it('can be disabled', () => {
    const expected = {
      name: 'multiple-dropdown',
      disabled: true
    }
    const component = mount(<MultipleDropdown {...expected} />)
    expect(component.find('.disabled').length).toBe(1)
  })

  it('can handle remove', () => {
    let updates = 0
    const expected = {
      name: 'multiple-dropdown',
      value: [{ name: 'United States', value: 'United States' }],
      options: [
        { name: 'United States', value: 'United States' },
        { name: 'Germany', value: 'Germany' }
      ],
      onUpdate: () => { updates++ }
    }
    const component = mount(<MultipleDropdown {...expected} />)
    component.find('.ic-token-delete-button').simulate('click')
    expect(updates).toBe(1)
  })

  it('avoids infinite loop if value is a string', () => {
    let updates = 0
    const expected = {
      name: 'multiple-dropdown',
      value: '',
      options: [
        { name: 'United States', value: 'United States' },
        { name: 'Germany', value: 'Germany' }
      ]
    }
    const component = mount(<MultipleDropdown {...expected} />)
    expect(component.find('input').length).toBe(1)
  })
})
