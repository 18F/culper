import React from 'react'
import { mount } from 'enzyme'
import ApplicantBirthDate from './ApplicantBirthDate'

describe('The applicant birth date component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      onUpdate: () => {}
    }
    const component = mount(<ApplicantBirthDate {...expected} />)
    component.find('.month input').simulate('change')
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('loads data', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '2015',
        date: new Date('01/01/2015')
      },
      onUpdate: () => {}
    }
    const component = mount(<ApplicantBirthDate {...expected} />)
    component.find('.month input').simulate('change')
    component.find('.day input').simulate('change')
    component.find('.year input').simulate('change')
  })
})
