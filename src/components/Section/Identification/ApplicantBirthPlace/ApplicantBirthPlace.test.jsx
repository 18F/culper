import React from 'react'
import { mount } from 'enzyme'
import ApplicantBirthPlace from './ApplicantBirthPlace'

describe('The ApplicantBirthPlace component', () => {
  const children = 4

  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<ApplicantBirthPlace name={expected.name} label={expected.label} help={expected.help} value={expected.value} country=''/>)
    component.find('input#city').simulate('blur')
    expect(component.find('div.hidden').length).toEqual(children)
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
    const component = mount(<ApplicantBirthPlace name={expected.name} onValidate={expected.handleValidation} />)
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
    const component = mount(<ApplicantBirthPlace name={expected.name} onChange={expected.handleChange} country=''/>)
    component.find('input[type="text"]').first().simulate('change')
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
    const component = mount(<ApplicantBirthPlace name={expected.name} onFocus={expected.handleFocus} country='' />)
    component.find('input[type="text"]').first().simulate('focus')
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
    const component = mount(<ApplicantBirthPlace name={expected.name} onBlur={expected.handleBlur} country='' />)
    component.find('input[type="text"]').first().simulate('blur')
    expect(blurs).toEqual(1)
  })
})
