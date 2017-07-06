import React from 'react'
import { mount } from 'enzyme'
import Medical from './Medical'

describe('The Medical Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<Medical {...expected} />)
    expect(component.find('.medical-release').length).toBe(1)
    component.find('.fullname input').simulate('change')
    expect(updates).toBe(1)
  })
})
