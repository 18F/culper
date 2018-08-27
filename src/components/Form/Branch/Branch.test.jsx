import React from 'react'
import { mount } from 'enzyme'
import Branch from './'

describe('The Branch component', () => {
  it('renders Branch with default options', () => {
    const component = mount(<Branch />)
    expect(component.find('input[type="radio"]').length).toBe(2)

    expect(
      component.findWhere(n => {
        if (n.name() === 'Radio') {
          const { label } = n.props()
          if (label === 'Yes' || label === 'No') {
            return true
          }
        }
        return false
      }).length
    ).toBe(2)
  })

  it('renders Branch with custom labels', () => {
    const component = mount(<Branch yesLabel="Yep" noLabel="Nope" />)
    expect(component.find('input[type="radio"]').length).toBe(2)

    expect(
      component.findWhere(n => {
        if (n.name() === 'Radio') {
          const { label } = n.props()
          if (label === 'Yep' || label === 'Nope') {
            return true
          }
        }
        return false
      }).length
    ).toBe(2)
  })
})
