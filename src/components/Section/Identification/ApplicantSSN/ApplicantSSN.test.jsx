import React from 'react'
import { mount } from 'enzyme'
import ApplicantSSN from './ApplicantSSN'

describe('The ApplicantSSN component', () => {
  const validElements = 5

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
    const component = mount(<ApplicantSSN name={expected.name} label={expected.label} value={expected.value} onBlur={expected.handleBlur} />)
    component.find('input#last').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    expect(blurs).toEqual(0)
  })

  // it('handles patterns', () => {
  //   const expected = [
  //     {
  //       name: 'applicant-good',
  //       value: '123456789',
  //       valid: true
  //     },
  //     {
  //       name: 'applicant-leading-zeros',
  //       value: '023050789',
  //       valid: true
  //     },
  //     {
  //       name: 'applicant-letters',
  //       value: 'a23b5c789',
  //       valid: false
  //     },
  //     {
  //       name: 'applicant-spaces',
  //       value: ' 23 5 789',
  //       valid: false
  //     }
  //   ]

  //   expected.forEach((ex) => {
  //     const component = mount(<ApplicantSSN name={ex.name} value={ex.value} />)
  //     component.find('input[name="first"]').simulate('blur')
  //     expect(component.find('div.hidden').length).toBeGreaterThan(ex.valid ? 4 : 0)
  //   })
  // })

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
    const component = mount(<ApplicantSSN name={expected.name} onValidate={expected.handleValidation} />)
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
    const component = mount(<ApplicantSSN name={expected.name} onChange={expected.handleChange} />)
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
    const component = mount(<ApplicantSSN name={expected.name} onFocus={expected.handleFocus} />)
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
    const component = mount(<ApplicantSSN name={expected.name} onBlur={expected.handleBlur} />)
    component.find('input').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('loads with first, middle and last values', () => {
    const component = mount(<ApplicantSSN name={'ssn'} first="111" middle="00" last="0101" />)
    component.find('input#first').hasClass('usa-input-success')
    component.find('input#middle').hasClass('usa-input-success')
    component.find('input#last').hasClass('usa-input-success')
  })

  it('loads with value and signals success', () => {
    const component = mount(<ApplicantSSN name={'ssn'} value="111001234" />)
    component.find('input#first').hasClass('usa-input-success')
    component.find('input#middle').hasClass('usa-input-success')
    component.find('input#last').hasClass('usa-input-success')

    component.find('input#first').simulate('change')
    component.find('input#middle').simulate('change')
    component.find('input#last').simulate('change')
  })

  it('loads with invalid values and signals error', () => {
    const component = mount(<ApplicantSSN name={'ssn'} first="abc" />)
    component.find('input#first').simulate('change')
  })
})
