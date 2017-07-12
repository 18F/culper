import React from 'react'
import { mount } from 'enzyme'
import { ToggleItem } from './ToggleItem'

describe('The toggle item component', () => {
  it('is closed by default', () => {
    const props = {}
    const component = mount(<ToggleItem {...props} />)
    expect(component.find('.closed').length).toBe(1)
  })

  it('can open', () => {
    const props = {}
    const component = mount(<ToggleItem {...props} />)
    component.find('a').simulate('click')
    expect(component.find('.closed').length).toBe(0)
    expect(component.find('.open').length).toBe(1)
  })
})
