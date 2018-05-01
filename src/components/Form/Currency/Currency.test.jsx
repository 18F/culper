import React from 'react'
import { mount } from 'enzyme'
import Currency from './Currency'

describe('The Currency component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      className: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<Currency {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
