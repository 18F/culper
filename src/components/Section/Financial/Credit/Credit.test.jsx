import React from 'react'
import { mount } from 'enzyme'
import Credit from './Credit'

describe('The credit component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'card-abuse'
    }
    const component = mount(<Credit {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'credit-counseling',
      HasCreditCounseling: { value: 'Yes' }
    }
    const component = mount(<Credit {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'credit-counseling',
      HasCreditCounseling: { value: 'No' }
    }
    const component = mount(<Credit {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'credit-counseling',
      HasCreditCounseling: { value: 'Yes' },
      List: { branch: { value: 'No' }, items: [{}] },
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<Credit {...expected} />)
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
    expect(component.find('.accordion').length).toBe(1)
    updates = 0
    component
      .find('.credit-explanation textarea')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.credit-name input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.credit-telephone input')
      .first()
      .simulate('change')
    component
      .find('.credit-location .city input')
      .simulate('change', { target: { value: 'Mesa' } })
    component
      .find('.credit-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBe(5)
  })
})
