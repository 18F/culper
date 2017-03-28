import React from 'react'
import { mount } from 'enzyme'
import { EmploymentItem } from './Employment'

describe('The employment component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<EmploymentItem {...expected} />)
    expect(component.find('h3').length).toBeGreaterThan(0)
  })

  it('can populate values for Military, NationalGuard and USPHS', () => {
    let updates = 0
    const expected = {
      name: 'employment',
      onUpdate: () => { updates++ }
    }
    const selectors = [
      'input#Title',
      'input#DutyStation',
      '.employment-status',
      '.daterange',
      '.address',
      '.telephone',
      '.supervisor',
      '.reason-leaving'
    ]

    const component = mount(<EmploymentItem {...expected} />)
    component.find({type: 'radio', value: 'ActiveMilitary'}).simulate('change')

    selectors.forEach(selector => {
      var len = component.find(selector).length
      expect(len).toBeGreaterThan(0)
    })

    expect(updates).toBe(1)
  })
})
