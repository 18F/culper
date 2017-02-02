import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The employment component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<Employment name={expected.name} />)
    expect(component.find('.selected').length).toEqual(0)
    expect(component.find('button.add').length).toEqual(1)
  })
})
