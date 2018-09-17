import React from 'react'
import { mount } from 'enzyme'
import MilitaryService from './MilitaryService'

describe('The military service component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-service'
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.service').length).toEqual(1)
    expect(component.find('.status').length).toEqual(1)
    expect(component.find('.officer').length).toEqual(1)
    expect(component.find('.service-number').length).toEqual(1)
    expect(component.find('.daterange').length).toEqual(1)
    expect(component.find('.service-state').length).toEqual(0)
    expect(component.find('.discharged').length).toEqual(1)
    expect(component.find('.discharge-type').length).toEqual(0)
    expect(component.find('.discharge-type-otherex').length).toEqual(0)
    expect(component.find('.discharge-reason').length).toEqual(0)
    expect(component.find('.discharge-date').length).toEqual(0)
  })

  it('select no for discharged and no new fields appear', () => {
    const expected = {
      name: 'military-service',
      HasBeenDischarged: { value: 'No' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.discharge-type').length).toEqual(0)
    expect(component.find('.discharge-type-otherex').length).toEqual(0)
    expect(component.find('.discharge-reason').length).toEqual(0)
    expect(component.find('.discharge-date').length).toEqual(0)
  })

  it('select yes for discharged and more information is required', () => {
    const expected = {
      name: 'military-service',
      HasBeenDischarged: { value: 'Yes' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.discharge-type').length).toEqual(1)
    expect(component.find('.discharge-type-otherex').length).toEqual(0)
    expect(component.find('.discharge-reason').length).toEqual(0)
    expect(component.find('.discharge-date').length).toEqual(1)
  })

  it('state of service field is not shown for non-guard service', () => {
    const expected = {
      name: 'military-service',
      Service: { value: 'Army' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.service-state').length).toEqual(0)
  })

  it('state of service field is not shown for non-guard service', () => {
    const expected = {
      name: 'military-service',
      Service: { value: 'ArmyNationalGuard' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.service-state').length).toEqual(1)
  })

  it('selecting other for discharge type presents textbox', () => {
    const expected = {
      name: 'military-service',
      HasBeenDischarged: { value: 'Yes' },
      DischargeType: { value: 'Other' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.discharge-type').length).toEqual(1)
    expect(component.find('.discharge-type-otherex').length).toEqual(1)
    expect(component.find('.discharge-reason').length).toEqual(1)
  })

  it('selecting discharge type which is not honorable', () => {
    const expected = {
      name: 'military-service',
      HasBeenDischarged: { value: 'Yes' },
      DischargeType: { value: 'General' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.discharge-type').length).toEqual(1)
    expect(component.find('.discharge-type-otherex').length).toEqual(0)
    expect(component.find('.discharge-reason').length).toEqual(1)
  })

  it('selecting discharge type which is honorable', () => {
    const expected = {
      name: 'military-service',
      HasBeenDischarged: { value: 'Yes' },
      DischargeType: { value: 'Honorable' }
    }
    const component = mount(<MilitaryService {...expected} />)
    expect(component.find('.discharge-type').length).toEqual(1)
    expect(component.find('.discharge-type-otherex').length).toEqual(0)
    expect(component.find('.discharge-reason').length).toEqual(0)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'military-service',
      Service: { value: 'AirNationalGuard' },
      HasBeenDischarged: { value: 'Yes' },
      DischargeType: { value: 'Other' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<MilitaryService {...expected} />)
    component.find('.service-airnationalguard input').simulate('change')
    component.find('.status .status-activeduty input').simulate('change')
    component.find('.officer .officer-enlisted input').simulate('change')
    component
      .find('.service-number input')
      .simulate('change', { target: { value: '1234567890' } })
    component
      .find('.dates .datecontrol.from .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.dates .datecontrol.from .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.dates .datecontrol.from .year input')
      .simulate('change', { target: { name: 'year', value: '2001' } })
    component
      .find('.dates .datecontrol.to .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.dates .datecontrol.to .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.dates .datecontrol.to .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.discharged .yes input').simulate('change')
    component.find('.discharge-type-other input').simulate('change')
    component.find('.discharge-type-otherex input').simulate('change', {
      target: { value: 'Something I have not heard of' }
    })
    component
      .find('.discharge-reason textarea')
      .simulate('change', { target: { value: 'Some reason' } })
    component
      .find('.discharge-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.discharge-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    expect(updates).toBeGreaterThan(10)
  })
})
