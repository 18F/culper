import React from 'react'
import { mount } from 'enzyme'
import DateControl from './DateControl'

describe('The date component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'DateControl input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    // expect(component.find('label.usa-input-error-label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    // expect(component.find('span.usa-input-error-message').length).toEqual(3)
    // expect(component.find('span.hidden').length).toEqual(0)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'DateControl input focused',
      help: 'Helpful error message',
      error: false,
      focus: true,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    component.find('input#' + expected.name + '-month').simulate('focus')
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'DateControl input success',
      help: 'Helpful error message',
      value: '01-28-2016'
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} value={expected.value} />)
    component.find('input#' + expected.name + '-month').simulate('change')
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').nodes[0].value).toEqual('1')
    expect(component.find('input#' + expected.name + '-month').hasClass('usa-input-success')).toEqual(true)
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders with valid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      help: 'Helpful error message',
      value: '01-28-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} value={expected.value} />)
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').nodes[0].value).toEqual('1')
    expect(component.find('input#' + expected.name + '-day').nodes[0].value).toEqual('28')
    expect(component.find('input#' + expected.name + '-year').nodes[0].value).toEqual('2016')
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders with invalid date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      help: 'Helpful error message',
      value: '99-28-2016',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} value={expected.value} />)
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-day').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-year').nodes[0].value).toEqual('')
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders with undefined date', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} value={expected.value} />)
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-day').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-year').nodes[0].value).toEqual('')
    expect(component.find('span.hidden').length).toEqual(3)
  })

  it('renders with date as random input', () => {
    const expected = {
      name: 'input-type-text',
      label: 'DateControl input label',
      help: 'Helpful error message',
      value: 'the quick brown fox...',
      error: false,
      focus: false,
      valid: false
    }
    const component = mount(<DateControl name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} value={expected.value} />)
    expect(component.find('label').length).toEqual(3)
    expect(component.find('input#' + expected.name + '-month').length).toEqual(1)
    expect(component.find('input#' + expected.name + '-month').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-day').nodes[0].value).toEqual('')
    expect(component.find('input#' + expected.name + '-year').nodes[0].value).toEqual('')
    expect(component.find('span.hidden').length).toEqual(3)
  })
})
