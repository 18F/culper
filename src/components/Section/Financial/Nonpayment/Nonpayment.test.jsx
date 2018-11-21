import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Nonpayment from './Nonpayment'

describe('The nonpayment component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Nonpayment {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'nonpayment'
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'nonpayment',
      HasNonpayment: { value: 'Yes' },
      List: { branch: {}, items: [] }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'nonpayment',
      HasNonpayment: { value: 'No' },
      List: { branch: {}, items: [] }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'nonpayment',
      HasNonpayment: { value: 'Yes' },
      List: { branch: {}, items: [{}] },
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.branch .yes input')
      .first()
      .simulate('change')
    component
      .find('.nonpayment-name input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.nonpayment-infractions input')
      .first()
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.nonpayment-accountnumber input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.nonpayment-propertytype input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.nonpayment-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.nonpayment-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.nonpayment-status input')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.nonpayment-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.nonpayment-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.nonpayment-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.nonpayment-resolved .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.nonpayment-resolved .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.nonpayment-resolved .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.nonpayment-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(11)
  })
})
