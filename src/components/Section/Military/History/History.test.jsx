import React from 'react'
import { mount } from 'enzyme'
import History, { serviceNameDisplay } from './History'

describe('The military history component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-history'
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting no to military service does nothing', () => {
    const expected = {
      name: 'military-history',
      HasServed: { value: 'No' }
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting yes to military service displays the form', () => {
    const expected = {
      name: 'military-history',
      HasServed: { value: 'Yes' }
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('can humanize service value names', () => {
    const tests = [
      { service: { value: 'AirForce' }, expected: 'Air Force' },
      {
        service: { value: 'AirNationalGuard' },
        expected: 'Air National Guard'
      },
      {
        service: { value: 'ArmyNationalGuard' },
        expected: 'Army National Guard'
      },
      { service: { value: 'CoastGuard' }, expected: 'Coast Guard' },
      { service: { value: 'MarineCorps' }, expected: 'Marine Corps' },
      { service: { value: 'Unknown' }, expected: 'Unknown' }
    ]

    tests.forEach(test => {
      expect(serviceNameDisplay(test.service)).toBe(test.expected)
    })
  })
})
