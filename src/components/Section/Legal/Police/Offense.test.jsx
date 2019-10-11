import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import Offense from './Offense'

describe('The offense component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <Offense {...expected} />
      </Provider>
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'offense',
      requireLegalOffenseInvolvements: true,
    }

    const component = createComponent(expected)
    expect(component.find('.offense-date').length).toEqual(1)
    expect(component.find('.offense-description').length).toEqual(1)
    expect(component.find('.offense-violence').length).toEqual(1)
    expect(component.find('.offense-firearms').length).toEqual(1)
    expect(component.find('.offense-substances').length).toEqual(1)
    expect(component.find('.offense-address').length).toEqual(1)
    expect(component.find('.offense-cited').length).toEqual(1)
    expect(component.find('.offense-citedby').length).toEqual(0)
    expect(component.find('.offense-agencyaddress .city').length).toEqual(0)
    expect(component.find('.offense-explanation').length).toEqual(0)
    expect(component.find('.offense-courtaddress').length).toEqual(0)
    expect(component.find('.offense-chargeType').length).toEqual(0)
    expect(component.find('.offense-courtcharge').length).toEqual(0)
    expect(component.find('.offense-courtoutcome').length).toEqual(0)
    expect(component.find('.offense-courtdate').length).toEqual(0)
    expect(component.find('.offense-sentenced').length).toEqual(0)
  })

  it('asks for explanation if not charged for a citation', () => {
    const expected = {
      name: 'offense',
      WasCited: { value: 'Yes' },
      WasCharged: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.offense-explanation').length).toEqual(1)
    expect(component.find('.offense-courtaddress').length).toEqual(0)
    expect(component.find('.offense-chargetype').length).toEqual(0)
    expect(component.find('.offense-courtcharge').length).toEqual(0)
    expect(component.find('.offense-courtoutcome').length).toEqual(0)
    expect(component.find('.offense-courtdate').length).toEqual(0)
    expect(component.find('.offense-sentenced').length).toEqual(0)
  })

  it('asks for court information if charged for a citation', () => {
    const expected = {
      name: 'offense',
      WasCited: { value: 'Yes' },
      WasCharged: { value: 'Yes' },
    }

    const component = createComponent(expected)
    expect(component.find('.offense-courtname').length).toEqual(1)
    expect(component.find('.offense-courtaddress').length).toEqual(1)
    expect(component.find('.offense-charges').length).toEqual(1)
    expect(component.find('.offense-sentenced').length).toEqual(1)
  })

  it('trigger updates when changing values with sentencing', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      WasCited: { value: 'Yes' },
      WasCharged: { value: 'Yes' },
      WasSentenced: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
      requireLegalOffenseInvolvements: true,
      requireLegalOffenseSentenced: true,
    }
    const component = createComponent(expected)
    component
      .find('.offense-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.offense-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.offense-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.offense-description textarea')
      .simulate('change', { target: { value: 'Some description' } })
    component.find('.offense-violence .yes input').simulate('change')
    component.find('.offense-firearms .yes input').simulate('change')
    component.find('.offense-substances .yes input').simulate('change')
    component
      .find('.offense-address .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-cited .yes input').simulate('change')
    component
      .find('.offense-citedby input')
      .simulate('change', { target: { value: 'Some agency' } })
    component
      .find('.offense-agencyaddress .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-charged .yes input').simulate('change')
    component
      .find('.offense-courtname input')
      .simulate('change', { target: { value: 'Some court' } })
    component
      .find('.offense-courtaddress .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-sentenced .yes input').simulate('change')
    component.find('.offense-sentenced .yes input').simulate('change')
    component
      .find('.offense-description textarea')
      .simulate('change', { target: { value: 'Test' } })
    component.find('.exceeds-year .yes input').simulate('change')
    expect(updates).toBeGreaterThan(6)
  })

  it('trigger updates when changing values without sentencing', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      WasCited: { value: 'Yes' },
      WasCharged: { value: 'Yes' },
      WasSentenced: { value: 'No' },
      AwaitingTrial: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
      requireLegalOffenseInvolvements: true,
    }
    const component = createComponent(expected)
    component
      .find('.offense-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.offense-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.offense-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.offense-description textarea')
      .simulate('change', { target: { value: 'Some description' } })
    component.find('.offense-violence .yes input').simulate('change')
    component.find('.offense-firearms .yes input').simulate('change')
    component.find('.offense-substances .yes input').simulate('change')
    component
      .find('.offense-address .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-cited .yes input').simulate('change')
    component
      .find('.offense-citedby input')
      .simulate('change', { target: { value: 'Some agency' } })
    component
      .find('.offense-agencyaddress .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-charged .yes input').simulate('change')
    component
      .find('.offense-courtname input')
      .simulate('change', { target: { value: 'Some court' } })
    component
      .find('.offense-courtaddress .city input')
      .simulate('change', { target: { value: 'The city' } })
    component.find('.offense-sentenced .no input').simulate('change')
    component.find('.awaiting-trial .yes input').simulate('change')
    component.find('.awaiting-trial-explanation textarea').simulate('change')
    expect(updates).toBeGreaterThan(6)
  })

  it('trigger updates when changing values without charges', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      WasCited: { value: 'Yes' },
      WasCharged: { value: 'No' },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component.find('.offense-charged .no input').simulate('change')
    component.find('.offense-explanation textarea').simulate('change')
    expect(updates).toBe(2)
  })
})
