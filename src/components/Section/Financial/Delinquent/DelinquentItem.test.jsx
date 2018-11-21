import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DelinquentItem from './DelinquentItem'

describe('The delinquent item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DelinquentItem {...expected} />
        </Provider>
      )
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'delinquent',
      onUpdate: obj => {
        updates++
      }
    }
    const component = createComponent(expected)
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
      .find('.delinquent-resolved .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.delinquent-courtname input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.delinquent-courtaddress .mailing input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.delinquent-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    component
      .find('.delinquent-amount-notapplicable .block input')
      .simulate('change')
    expect(updates).toBe(13)
  })
})
