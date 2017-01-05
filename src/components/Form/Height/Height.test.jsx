import React from 'react'
import { mount } from 'enzyme'
import Height from './Height'

describe('The Height component', () => {
  it('no error on empty', () => {
    let expected = {
      name: 'height',
      label: 'Feet',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<Height name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#height-feet').simulate('change')
    expect(component.find('label[htmlFor="height-feet"]').text()).toEqual(expected.label)
    expect(component.find('input#height-feet').length).toEqual(1)
    expect(component.find('span#height-feet-error').length).toEqual(1)

    expected = {
      name: 'height',
      label: 'Inches',
      help: 'Helpful error message',
      value: ''
    }
    component.find('input#height-inches').simulate('change')
    expect(component.find('label[htmlFor="height-inches"]').text()).toEqual(expected.label)
    expect(component.find('input#height-inches').length).toEqual(1)
    expect(component.find('span#height-inches-error').length).toEqual(1)
  })
})
