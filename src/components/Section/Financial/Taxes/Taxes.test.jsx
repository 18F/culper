import React from 'react'
import { mount } from 'enzyme'
import Taxes from './Taxes'

describe('The taxes component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'taxes'
    }
    const component = mount(<Taxes {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'Yes' }
    }
    const component = mount(<Taxes {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'No' }
    }
    const component = mount(<Taxes {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'taxes',
      HasTaxes: { value: 'Yes' },
      List: { branch: { value: 'Yes' }, items: [{}] },
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<Taxes {...expected} />)
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    component.find('.failure-file input').simulate('change')
    component
      .find('.taxes-year input[type="text"]')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.taxes-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.taxes-agency input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.taxes-taxtype input')
      .simulate('change', { target: { value: 'Income' } })
    component
      .find('.taxes-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.taxes-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.taxes-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.taxes-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.taxes-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(7)
  })
})
