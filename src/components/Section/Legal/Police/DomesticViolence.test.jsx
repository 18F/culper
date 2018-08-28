import React from 'react'
import { mount } from 'enzyme'
import DomesticViolence from './DomesticViolence'

describe('The DomesticViolence  component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'sentence'
    }
    const component = mount(<DomesticViolence {...expected} />)
    expect(component.find('.explanation').length).toEqual(1)
    expect(component.find('.domestic-courtname').length).toEqual(1)
    expect(component.find('.domestic-courtaddress').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'sentence',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<DomesticViolence {...expected} />)

    const selectors = [
      '.explanation textarea',
      { type: 'text', name: 'address' },
      { type: 'text', name: 'CourtName' },
      { type: 'text', name: 'month' }
    ]

    selectors.forEach(selector => {
      component.find(selector).simulate('change', { target: { value: '1' } })
    })

    expect(updates).toEqual(4)
  })
})
