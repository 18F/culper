import React from 'react'
import { mount } from 'enzyme'
import BirthPlace from './BirthPlace'

describe('The BirthPlace component', () => {
  const children = 4

  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<BirthPlace name={expected.name} label={expected.label} value={expected.value} country=''/>)
    component.find('input#city').simulate('blur')
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
    const component = mount(<BirthPlace name={expected.name} onValidate={expected.handleValidation} />)
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
    const component = mount(<BirthPlace name={expected.name} onChange={expected.handleChange} country=''/>)
    component.find('input[type="text"]').first().simulate('change')
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
    const component = mount(<BirthPlace name={expected.name} onFocus={expected.handleFocus} country='' />)
    component.find('input[type="text"]').first().simulate('focus')
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
    const component = mount(<BirthPlace name={expected.name} onBlur={expected.handleBlur} country='' />)
    component.find('input[type="text"]').first().simulate('blur')
    expect(blurs).toEqual(1)
  })

  it('selects that user was born in US', () => {
    let updates = 0
    const expected = {
      name: 'input-error',
      label: 'Text input error',
      error: true,
      focus: false,
      valid: false,
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<BirthPlace name={expected.name} onBlur={expected.handleBlur} onUpdate={expected.onUpdate} country='' />)
    component.find({type: 'radio', name: 'is_domestic', value: 'Yes'}).simulate('change')
    expect(component.find('input').length).toBe(5)
    expect(updates).toBe(1)

    component.find({type: 'radio', name: 'is_domestic', value: 'No'}).simulate('change')
    expect(updates).toBe(2)
    expect(component.find('input').length).toBe(4)
  })

  it('can hide branching', () => {
    const expected = {
      name: 'birthplace-test',
      branch: false
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find({type: 'radio'}).length).toBe(0)
  })

  it('can view domestic only', () => {
    const expected = {
      name: 'birthplace-test',
      branch: false,
      disabledCountry: true
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find({type: 'radio'}).length).toBe(0)
    expect(component.find('.state').length).toBe(1)
    expect(component.find('.country').length).toBe(0)
  })

  it('can view foreign only', () => {
    const expected = {
      name: 'birthplace-test',
      branch: false,
      disabledState: true
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find({type: 'radio'}).length).toBe(0)
    expect(component.find('.country').length).toBe(1)
    expect(component.find('.state').length).toBe(0)
  })
})
