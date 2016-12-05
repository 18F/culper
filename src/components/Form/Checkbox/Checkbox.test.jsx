import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from './Checkbox'

describe('The checkbox component', () => {
  it('renders appropriately with an error', () => {
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false
    }
    const component = shallow(<Checkbox name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label.usa-input-error-label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('span.usa-input-error-message').text()).toEqual(expected.help)
    expect(component.find('span.hidden').length).toEqual(0)
  })

  it('renders appropriately with focus', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      error: false,
      focus: true,
      valid: false
    }
    const component = shallow(<Checkbox name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('input#' + expected.name).hasClass('usa-input-focus')).toEqual(true)
    expect(component.find('span.hidden').length).toEqual(1)
  })

  it('renders appropriately with validity checks', () => {
    const expected = {
      name: 'input-success',
      label: 'Text input success',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: true
    }
    const component = shallow(<Checkbox name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('input#' + expected.name).hasClass('usa-input-success')).toEqual(true)
    expect(component.find('span.hidden').length).toEqual(1)
  })

  it('renders sane defaults', () => {
    const expected = {
      name: 'input-type-text',
      label: 'Text input label',
      help: 'Helpful error message',
      error: false,
      focus: false,
      valid: false
    }
    const component = shallow(<Checkbox name={expected.name} label={expected.label} help={expected.help} error={expected.error} focus={expected.focus} valid={expected.valid} />)
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input#' + expected.name).length).toEqual(1)
    expect(component.find('span.hidden').length).toEqual(1)
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = shallow(<Checkbox name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').simulate('change')
    expect(validations).toEqual(1)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = shallow(<Checkbox name={expected.name} onChange={expected.handleChange} />)
    component.find('input').simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleFocus: function (event) {
        foci++
      }
    }
    const component = shallow(<Checkbox name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      help: 'Helpful error message',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = shallow(<Checkbox name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').simulate('blur')
    expect(blurs).toEqual(1)
  })
})
