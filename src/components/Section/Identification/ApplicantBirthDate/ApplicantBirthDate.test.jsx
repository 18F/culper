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
    let updates = 0
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '1700',
        date: new Date('01/01/1700')
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ApplicantBirthDate {...expected} />)
    component.find('.month input').simulate('change')
    component.find('.day input').simulate('change')
    component.find('.year input').simulate('change')
    component.find('.age-warning input').simulate('change')
    expect(updates).toBe(4)
  })

  it('displays age confirmation', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      Date: {
        month: '01',
        day: '01',
        year: '1700',
        date: new Date('01/01/1700')
      },
      onUpdate: () => {}
    }
    const component = mount(<ApplicantBirthDate {...expected} />)
    expect(component.find('.age-warning').length).toBe(1)
  })
})
