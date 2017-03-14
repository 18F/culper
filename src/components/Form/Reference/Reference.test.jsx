import React from 'react'
import { mount } from 'enzyme'
import Reference from './Reference'

describe('The Reference component', () => {
  it('no error on empty', () => {
    let updates = 0
    const expected = {
      name: 'reference',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Reference {...expected} />)
    component.find('input#last').simulate('change')
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
    component.find('input[name="relationship-neighbor"]').first().simulate('change')
    expect(updates).toBe(2)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'reference',
      Relationship: ['Other']
    }
    const component = mount(<Reference {...expected} />)
    expect(component.find('.relationship-other').length).toEqual(1)
    component.find('.relationship-other input').simulate('change', { target: { value: 'Acquaintance' } })
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'reference',
      Relationship: ['Complicated']
    }
    const component = mount(<Reference {...expected} />)
    expect(component.find('.relationship-other').length).toEqual(0)
  })

  it('can toggle values', () => {
    let updates = 0
    const expected = {
      name: 'reference',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Reference {...expected} />)
    component.find({ type: 'checkbox', value: 'Neighbor' }).simulate('change')
    component.find({ type: 'checkbox', value: 'Friend' }).simulate('change')
    expect(updates).toEqual(2)
    component.find({ type: 'checkbox', value: 'Neighbor' }).simulate('change')
    expect(updates).toEqual(3)
  })
})
