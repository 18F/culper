import React from 'react'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'

describe('The Dropdown component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Dropdown input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false
    }
    const component = shallow(<Dropdown name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label.usa-input-error-label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
    expect(component.find('div.message').text()).toEqual(expected.help)
    expect(component.find('div.hidden').length).toEqual(0)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Dropdown input focused',
      help: 'Helpful error message',
      error: false,
      focus: true,
      valid: false
    }
    const component = shallow(<Dropdown name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
    expect(component.find('select#' + expected.name).hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('div.hidden').length).toEqual(1)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Dropdown input success',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: true
    }
    const component = shallow(<Dropdown name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
    expect(component.find('select#' + expected.name).hasClass('usa-input-success')).toEqual(true)
    expect(component.find('div.hidden').length).toEqual(1)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Dropdown input label',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: false
    }
    const component = shallow(<Dropdown name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
    expect(component.find('div.hidden').length).toEqual(1)
  })
})
