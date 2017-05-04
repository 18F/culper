import React from 'react'
import { mount } from 'enzyme'
import Height from './Height'

describe('The Height component', () => {
  let onUpdate = () => {}
  it('no error on empty', () => {
    let expected = {
      name: 'height',
      label: 'Feet',
      value: ''
    }
    const component = mount(<Height name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#feet').simulate('keyup', { keyCode: 48, target: { value: '1' } })
    component.find('input#feet').simulate('focus')
    component.find('input#feet').simulate('blur')
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

  it('can autotab forward', () => {
    let tabbed = false
    const expected = {
      name: 'height',
      tab: () => { tabbed = true }
    }
    const component = mount(<Height {...expected} />)
    component.find('input#feet').simulate('keyup', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(false)
    component.find('input#feet').simulate('keyup', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(true)
  })

  it('can autotab backward', () => {
    let tabbed = false
    const expected = {
      name: 'height',
      tab: () => { tabbed = true }
    }
    const component = mount(<Height {...expected} />)
    component.find('input#inches').simulate('keyup', { keyCode: 48, target: { value: '1' } })
    expect(tabbed).toBe(false)
    component.find('input#inches').simulate('keyup', { keyCode: 8, target: { value: '' } })
    expect(tabbed).toBe(true)
  })
})
