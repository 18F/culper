import React from 'react'
import { mount } from 'enzyme'
import ApplicantBirthPlace from './ApplicantBirthPlace'

describe('The ApplicantBirthPlace component', () => {
  it('no error on empty', () => {
    let updates = 0
    const expected = {
      name: 'input-focus',
      className: 'input-focus',
      label: 'Text input focused',
      value: '',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ApplicantBirthPlace {...expected} />)
    component.find('.blocks .yes input').simulate('change')
    expect(updates).toBe(1)
  })
})
