import React from 'react'
import { shallow } from 'enzyme'
import Generic from './Generic'

describe('The generic component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      type: 'text',
      error: true,
      focus: false,
      valid: false
    }
    const component = shallow(<Generic name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label.usa-input-error-label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(1)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      type: 'text',
      error: false,
      focus: true,
      valid: false
    }
    const component = shallow(<Generic name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('input#' + expected.name).hasClass('usa-input-focus')).toEqual(true)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
      type: 'text',
      error: false,
      focus: false,
      valid: true
    }
    const component = shallow(<Generic name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('input#' + expected.name).hasClass('usa-input-success')).toEqual(true)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      type: 'text',
      error: false,
      focus: false,
      valid: false
    }
    const component = shallow(<Generic name={expected.name} label={expected.label} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
  })
})
