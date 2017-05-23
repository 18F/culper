import React from 'react'
import { mount } from 'enzyme'
import County from './County'

describe('The County component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      className: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<County {...expected} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('bubbles up validate event', () => {
    let validations = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleValidation: function (event) {
        validations++
      }
    }
    const component = mount(<County name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('change')
    expect(validations > 0).toEqual(true)
  })

  it('bubbles up change event', () => {
    let changes = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleChange: function (event) {
        changes++
      }
    }
    const component = mount(<County name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
    expect(changes).toEqual(1)
  })

  it('bubbles up focus event', () => {
    let foci = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleFocus: function (event) {
        foci++
      }
    }
    const component = mount(<County name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
    expect(foci).toEqual(1)
  })

  it('bubbles up blur event', () => {
    let blurs = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<County name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })
})
