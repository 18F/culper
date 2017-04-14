import React from 'react'
import { mount } from 'enzyme'
import Multiple from './Multiple'

describe('The multiple component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'multiple'
    }
    const component = mount(<Multiple {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })
})
