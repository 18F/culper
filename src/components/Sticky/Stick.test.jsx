import React from 'react'
import { mount } from 'enzyme'
import Sticky from './Sticky'

describe('The sticky component', () => {
  it('default position is relative', () => {
    const props = {}
    const component = mount(<Sticky {...props} />)
    expect(component.state('position')).toBe('relative')
  })
})
