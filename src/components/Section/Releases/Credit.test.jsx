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
    component.find('.fullname input').simulate('change')
    component.find('.date .day input').simulate('change')
    expect(updates).toBe(2)
  })
})
