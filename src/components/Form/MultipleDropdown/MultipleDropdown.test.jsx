import React from 'react'
import { mount } from 'enzyme'
import MultipleDropdown from './MultipleDropdown'

describe('The MultipleDropdown component', () => {
  it('display selected values', () => {
    const expected = {
      name: 'multiple-dropdown',
      value: ['United States'],
      input: 'Uni'
    }
    const options = [
      { name: 'United States', value: 'United States' },
      { name: 'Germany', value: 'Germany' }
    ].map(x => {
      return (
        <option key={x.value} value={x.value}>
          {x.name}
        </option>
      )
    })
    const component = mount(
      <MultipleDropdown {...expected}>{options}</MultipleDropdown>
    )
    expect(component.find('.token').length).toBe(1)
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
      value: ['United States'],
      onUpdate: () => {
        updates++
      }
    }
    const options = [
      { name: 'United States', value: 'United States' },
      { name: 'Germany', value: 'Germany' }
    ].map(x => {
      return (
        <option key={x.value} value={x.value}>
          {x.name}
        </option>
      )
    })
    const component = mount(
      <MultipleDropdown {...expected}>{options}</MultipleDropdown>
    )
    component.find('.token-delete').simulate('click')
    expect(updates).toBe(1)
  })

  it('avoids infinite loop if value is a string', () => {
    const expected = {
      name: 'multiple-dropdown',
      value: ''
    }
    const options = [
      { name: 'United States', value: 'United States' },
      { name: 'Germany', value: 'Germany' }
    ].map(x => {
      return (
        <option key={x.value} value={x.value}>
          {x.name}
        </option>
      )
    })
    const component = mount(
      <MultipleDropdown {...expected}>{options}</MultipleDropdown>
    )
    expect(component.find('input').length).toBe(1)
  })

  it('handles when no match found', () => {
    let updated = false
    const expected = {
      value: [],
      onUpdate: () => {
        updated = true
      }
    }
    const options = [{ name: 'Germany', value: 'Germany' }].map(x => {
      return (
        <option key={x.value} value={x.value}>
          {x.name}
        </option>
      )
    })
    const component = mount(
      <MultipleDropdown {...expected}>{options}</MultipleDropdown>
    )
    component.find('.dropdown input').simulate('change', {
      target: {
        value: 'Belg'
      }
    })
    component.find('.dropdown input').simulate('keydown', { keyCode: 13 })
    expect(updated).toBe(false)
  })
})
