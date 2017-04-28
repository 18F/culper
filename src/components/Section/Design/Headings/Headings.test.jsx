import React from 'react'
import { mount } from 'enzyme'
import Headings from './Headings'

describe('The headings component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'headings'
    }
    const component = mount(<Headings {...expected} />)
    expect(component.find('.headings').length).toBe(1)
  })
})
