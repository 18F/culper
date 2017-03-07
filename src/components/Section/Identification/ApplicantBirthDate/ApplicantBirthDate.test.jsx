import React from 'react'
import { mount } from 'enzyme'
import ApplicantBirthDate from './ApplicantBirthDate'

describe('The applicant birth date component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    let onUpdate = () => {}
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} value={expected.value} onUpdate={onUpdate} />)
    component.find('input#month').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('no error on undefined', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: undefined
    }
    let onUpdate = () => {}
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} value={expected.value} onUpdate={onUpdate} />)
    component.find('input#month').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('populates values', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '01/01/2015'
    }
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#month').simulate('change')
    component.find('input#day').simulate('change')
    component.find('input#year').simulate('change')
  })

  it('loads data', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '01/01/2015'
    }
    let onUpdate = () => {}
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} value={expected.value} onUpdate={onUpdate} />)
    component.find('input#month').simulate('change')
    component.find('input#day').simulate('change')
    component.find('input#year').simulate('change')
  })
})
