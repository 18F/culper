import React from 'react'
import { mount } from 'enzyme'
import Height from './Height'

describe('The Height component', () => {
  it('no error on empty', () => {
    let expected = {
      name: 'height',
      label: 'Feet',
      value: ''
    }
    const component = mount(<Height name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#feet').simulate('change')
    expect(component.find('label[htmlFor="feet"]').text()).toEqual(expected.label)
    expect(component.find('input[name="feet"]').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)

    expected = {
      name: 'height',
      label: 'Inches',
      value: ''
    }
    component.find('input#inches').simulate('change')
    expect(component.find('label[htmlFor="inches"]').text()).toEqual(expected.label)
    expect(component.find('input[name="inches"]').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
