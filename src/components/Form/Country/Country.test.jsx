import React from 'react'
import { mount } from 'enzyme'
import Country from './Country'

describe('The Country component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<Country name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('select#' + expected.name).simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('select#' + expected.name).length).toEqual(1)
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
    const component = mount(<Country name={expected.name} onValidate={expected.handleValidation} />)
    component.find('select').simulate('change')
    expect(validations > 0).toEqual(true)
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
    const component = mount(<Country name={expected.name} onChange={expected.handleChange} />)
    component.find('select').simulate('change')
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
    const component = mount(<Country name={expected.name} onFocus={expected.handleFocus} />)
    component.find('select').simulate('focus')
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
    const component = mount(<Country name={expected.name} onBlur={expected.handleBlur} />)
    component.find('select').simulate('blur')
    expect(blurs).toEqual(1)
  })
})
