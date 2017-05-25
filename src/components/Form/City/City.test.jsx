import React from 'react'
import { mount } from 'enzyme'
import City from './City'

describe('The City component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      className: 'input-focus',
      value: ''
    }
    const component = mount(<City {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
