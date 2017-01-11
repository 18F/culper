import React from 'react'
import { mount } from 'enzyme'
import ApplicantBirthDate from './ApplicantBirthDate'

describe('The applicant birth date component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      help: 'Helpful error message',
      value: ''
    }
    const component = mount(<ApplicantBirthDate name={expected.name} label={expected.label} help={expected.help} value={expected.value} />)
    component.find('input#month').simulate('change')
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })
})
