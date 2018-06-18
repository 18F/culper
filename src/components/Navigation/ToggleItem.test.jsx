import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import { ToggleItem } from './ToggleItem'

describe('The toggle item component', () => {
  it('is closed by default', () => {
    const props = {}
    const component = mount(<MemoryRouter><ToggleItem {...props} /></MemoryRouter>)
    expect(component.find('.closed').length).toBe(1)
  })

  it('can open', () => {
    const props = {}
    const component = mount(<MemoryRouter><ToggleItem {...props} /></MemoryRouter>)
    component.find('a').simulate('click')
    expect(component.find('.closed').length).toBe(0)
    expect(component.find('.open').length).toBe(1)
  })
})
