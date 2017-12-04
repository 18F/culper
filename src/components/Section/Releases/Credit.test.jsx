import React from 'react'
import { mount } from 'enzyme'
import Credit from './Credit'

describe('The Credit Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<Credit {...expected} />)
    expect(component.find('.credit-release').length).toBe(1)
    component.find('.signature button').simulate('click')
    expect(updates).toBe(1)
  })
})
