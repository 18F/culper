import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Card from './Card'

describe('The card component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Card {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'card-abuse'
    }
    const component = createComponent(expected)
    expect(component.find('.branch').length).toBeGreaterThan(0)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('displays fields when "yes" is selected', () => {
    const expected = {
      name: 'card-abuse',
      HasCardAbuse: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('does not display any fields when "no" is selected', () => {
    const expected = {
      name: 'card-abuse',
      HasCardAbuse: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'card-abuse',
      HasCardAbuse: { value: 'Yes' },
      List: { branch: { value: 'No' }, items: [{}] },
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
      .find('.card-agency input')
      .simulate('change', { target: { value: 'IRS' } })
    component
      .find('.card-address .mailing input')
      .simulate('change', { target: { value: '123 Some Rd' } })
    component
      .find('.card-date .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.card-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.card-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.card-reason textarea')
      .simulate('change', { target: { value: 'Reason for not filing' } })
    component
      .find('.card-amount input[type="text"]')
      .simulate('change', { target: { value: '10000' } })
    component
      .find('.card-description textarea')
      .simulate('change', { target: { value: 'Description for not filing' } })
    expect(updates).toBeGreaterThan(7)
  })
})
