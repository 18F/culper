import React from 'react'
import { mount } from 'enzyme'
import Reference from './Reference'

describe('The Reference component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'reference'
    }
    const component = mount(<Reference name={expected.name} />)
    component.find('input#last').simulate('change')
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })

  it('displays text box when other is selected', () => {
    const expected = {
      name: 'reference',
      Relationship: 'Other'
    }
    const component = mount(<Reference {...expected} />)
    expect(component.find('.relationship.hidden').length).toEqual(0)
  })

  it('displays text box when role value is other than any of the possible values', () => {
    const expected = {
      name: 'reference',
      Relationship: 'Complicated'
    }
    const component = mount(<Reference {...expected} />)
    expect(component.find('.relationship.hidden').length).toEqual(0)
  })
})
