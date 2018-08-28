import React from 'react'
import { mount } from 'enzyme'
import ValidForm from './ValidForm'

describe('The Valid form submission component', () => {
  it('renders releases', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ValidForm {...expected} />)
    expect(component.find('.valid-form').length).toBe(1)
    component.find('.additional-comments .signature button').simulate('click')
    expect(updates).toBe(1)
  })

  it('renders releases with hippa ', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      hideHippa: false
    }
    const component = mount(<ValidForm {...expected} />)
    expect(component.find('.valid-form').length).toBe(1)
    component.find('.additional-comments .signature button').simulate('click')
    expect(updates).toBe(1)
  })
})
