import React from 'react'
import { mount } from 'enzyme'
import Delinquent from './Delinquent'

describe('The delinquent component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'delinquent'
    }
    const component = mount(<Delinquent {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'delinquent',
      HasDelinquent: { value: 'Yes' },
      List: { branch: {}, items: [] }
    }
    const component = mount(<Delinquent {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'delinquent',
      HasDelinquent: { value: 'No' },
      List: { branch: {}, items: [] }
    }
    const component = mount(<Delinquent {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'delinquent',
      HasDelinquent: { value: 'Yes' },
      List: { branch: {}, items: [{}] },
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<Delinquent {...expected} />)
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    component
      .find('.delinquent-name input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.delinquent-infractions .delinquent-alimony input')
      .simulate('change')
    component
      .find('.delinquent-accountnumber input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.delinquent-propertytype input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.delinquent-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.delinquent-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.delinquent-status input')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.delinquent-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.delinquent-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.delinquent-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.delinquent-resolved .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.delinquent-resolved .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.delinquent-resolved .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.delinquent-courtname input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.delinquent-courtaddress .mailing input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.delinquent-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(11)
  })
})
