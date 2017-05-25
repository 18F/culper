import React from 'react'
import { mount } from 'enzyme'
import Service from './Service'

describe('The Service component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      className: 'input-focus',
      value: ''
    }
    const component = mount(<Service {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('error on maximum length', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      className: 'input-focus',
      value: '12'
    }
    const component = mount(<Service {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(1)
  })
})
