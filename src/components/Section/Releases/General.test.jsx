import React from 'react'
import { mount } from 'enzyme'
import General from './General'

describe('The General Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<General {...expected} />)
    expect(component.find('.general-release').length).toBe(1)
    component.find('.fullname input').simulate('change')
    expect(updates).toBe(1)
  })
})
