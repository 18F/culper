import React from 'react'
import { mount } from 'enzyme'
import Deliquent from './Deliquent'

describe('The deliquent component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'deliquent'
    }
    const component = mount(<Deliquent {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'deliquent',
      HasDeliquent: 'Yes'
    }
    const component = mount(<Deliquent {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'deliquent',
      HasDeliquent: 'No'
    }
    const component = mount(<Deliquent {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'deliquent',
      onUpdate: (obj) => {
        updates++
      }
    }
    const component = mount(<Deliquent {...expected} />)
    component.find('.branch .yes input').simulate('change')
    component.find('.deliquent-name input').simulate('change', { target: { value: 'IRS' } })
    component.find('.deliquent-infractions .deliquent-alimony input').simulate('change')
    component.find('.deliquent-accountnumber input').simulate('change', { target: { value: 'IRS' } })
    component.find('.deliquent-propertytype input').simulate('change', { target: { value: 'IRS' } })
    component.find('.deliquent-amount input[type="text"]').simulate('change', { target: { value: '10000' } })
    component.find('.deliquent-reason textarea').simulate('change', { target: { value: 'Reason for not filing' } })
    component.find('.deliquent-status input').simulate('change', { target: { value: 'Reason for not filing' } })
    component.find('.deliquent-date .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.deliquent-date .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.deliquent-date .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.deliquent-resolved .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.deliquent-resolved .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.deliquent-resolved .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.deliquent-courtname input').simulate('change', { target: { value: '123 Some Rd' } })
    component.find('.deliquent-courtaddress .mailing input').simulate('change', { target: { value: '123 Some Rd' } })
    component.find('.deliquent-description textarea').simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(11)
  })
})
