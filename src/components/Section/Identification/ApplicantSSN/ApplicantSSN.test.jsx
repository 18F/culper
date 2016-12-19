import React from 'react'
import { mount } from 'enzyme'
import ApplicantSSN from './ApplicantSSN'

describe('The ApplicantSSN component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<ApplicantSSN name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#' + expected.name + '-last').simulate('change')
    expect(component.find('span.hidden').length).toEqual(4)
  })

  it('handles patterns', () => {
    const expected = [
      {
        name: 'applicant-good',
        value: '123456789',
        valid: true
      },
      {
        name: 'applicant-leading-zeros',
        value: '023050789',
        valid: true
      },
      {
        name: 'applicant-letters',
        value: 'a23b5c789',
        valid: false
      },
      {
        name: 'applicant-spaces',
        value: ' 23 5 789',
        valid: false
      }
    ]

    expected.forEach((ex) => {
      const component = mount(<ApplicantSSN name={ex.name} value={ex.value} />)
      component.find('input#' + ex.name + '-first').simulate('change')
      expect(component.find('span.hidden').length === component.find('span').length).toEqual(ex.valid)
    })
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
    const component = mount(<ApplicantSSN name={expected.name} onValidate={expected.handleValidation} />)
    component.find('input').first().simulate('change')
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
    const component = mount(<ApplicantSSN name={expected.name} onChange={expected.handleChange} />)
    component.find('input').first().simulate('change')
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
    const component = mount(<ApplicantSSN name={expected.name} onFocus={expected.handleFocus} />)
    component.find('input').first().simulate('focus')
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
    const component = mount(<ApplicantSSN name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })
})
