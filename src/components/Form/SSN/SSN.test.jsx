import React from 'react'
import { mount } from 'enzyme'
import SSN from './SSN'

describe('The SSN component', () => {
  it('no error on empty', () => {
    let blurs = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '',
      handleBlur: function (event) {
        blurs++
      }
    }
    const component = mount(<SSN name={expected.name} label={expected.label} value={expected.value} onBlur={expected.handleBlur} />)
    component.find('input#last').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    expect(blurs).toEqual(0)
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
    const component = mount(<SSN name={expected.name} onValidate={expected.handleValidation} />)
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
    const component = mount(<SSN name={expected.name} onChange={expected.handleChange} />)
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
    const component = mount(<SSN name={expected.name} onFocus={expected.handleFocus} />)
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
    const component = mount(<SSN name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('loads with first, middle and last values', () => {
    const component = mount(<SSN name={'ssn'} first="111" middle="00" last="0101" />)
    component.find('input#first').hasClass('usa-input-success')
    component.find('input#middle').hasClass('usa-input-success')
    component.find('input#last').hasClass('usa-input-success')
  })

  it('loads with value and signals success', () => {
    const component = mount(<SSN name={'ssn'} value="111001234" />)
    component.find('input#first').hasClass('usa-input-success')
    component.find('input#middle').hasClass('usa-input-success')
    component.find('input#last').hasClass('usa-input-success')

    component.find('input#first').simulate('change')
    component.find('input#middle').simulate('change')
    component.find('input#last').simulate('change')
  })

  it('loads with invalid values and signals error', () => {
    const component = mount(<SSN name={'ssn'} first="abc" />)
    component.find('input#first').simulate('change')
  })

  it('loads value that is an incorrect length', () => {
    const component = mount(<SSN name="ssn" value="1234" />)
    expect(component.find({ type: 'text', name: 'first', value: '123' }).length).toBe(1)
    expect(component.find({ type: 'text', name: 'middle', value: '4' }).length).toBe(1)
    expect(component.find({ type: 'text', name: 'last', value: '' }).length).toBe(1)
  })

  it('disallows use of clipboard', () => {
    const component = mount(<SSN name="ssn" />)
    component.find({ type: 'text', name: 'first' }).simulate('paste', { target: { value: '111' } })
    expect(component.find({ type: 'text', name: 'first', value: '111' }).length).toBe(0)
    expect(component.find({ type: 'text', name: 'first', value: '' }).length).toBe(1)
  })
})
