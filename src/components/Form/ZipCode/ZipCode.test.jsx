import React from 'react'
import { mount } from 'enzyme'
import ZipCode from './ZipCode'

describe('The ZipCode component', () => {
  it('no error on empty', () => {
    let focus = 0
    let blur = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      className: 'input-focus',
      value: '',
      onFocus: () => {
        focus++
      },
      onBlur: () => {
        blur++
      }
    }
    const component = mount(<ZipCode {...expected} />)
    component.find('input').simulate('change')
    component.find('input').simulate('blur')
    component.find('input').simulate('focus')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    expect(focus).toBeGreaterThan(0)
    expect(blur).toBeGreaterThan(0)
  })
})
