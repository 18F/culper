import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import NonpaymentItem from './NonpaymentItem'

describe('The nonpayment item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <NonpaymentItem {...expected} />
        </Provider>
      )
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'nonpayment',
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
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
      .find(
        '.nonpayment-amount-notapplicable .block input[name="AmountEstimated"]'
      )
      .simulate('change')
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
      .find('.nonpayment-resolved .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.nonpayment-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBe(11)
  })
})
