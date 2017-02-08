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
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input#month').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })
})
