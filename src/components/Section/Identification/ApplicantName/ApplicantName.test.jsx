import React from 'react'
import { mount } from 'enzyme'
import { ApplicantName } from './ApplicantName'

describe('The ApplicantName component', () => {
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
    const component = mount(<ApplicantName {...expected} />)
    component.find('.first input').simulate('change')
    expect(updates).toBe(1)
  })

  it('defaults behave as expected', () => {
    expect(ApplicantName.defaultProps.onError(0, [])).toEqual([])
    expect(ApplicantName.defaultProps.validator()).toBe(false)
    expect(ApplicantName.defaultProps.onUpdate()).toBe(undefined)
    expect(ApplicantName.defaultProps.dispatch()).toBe(undefined)
  })
})
