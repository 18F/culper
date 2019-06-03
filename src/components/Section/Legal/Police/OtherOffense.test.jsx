import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import OtherOffense from './OtherOffense'

describe('The offense component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => mount(
      <Provider store={store}>
        <OtherOffense {...expected} />
      </Provider>
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'offense',
    }
    const component = createComponent(expected)
    expect(component.find('.offense-date').length).toEqual(1)
    expect(component.find('.offense-description').length).toEqual(1)
    expect(component.find('.offense-violence').length).toEqual(1)
    expect(component.find('.offense-firearms').length).toEqual(1)
    expect(component.find('.offense-substances').length).toEqual(1)
    expect(component.find('.offense-courtname').length).toEqual(1)
    expect(component.find('.offense-courtaddress').length).toEqual(1)
    expect(component.find('.offense-charges').length).toEqual(1)
    expect(component.find('.offense-sentenced').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      WasSentenced: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
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
      .find('.offense-courtname input')
      .simulate('change', { target: { value: 'Some court' } })
    component
      .find('.offense-courtaddress .city input')
      .simulate('change', { target: { value: 'The city' } })
    component
      .find('.offense-description textarea')
      .simulate('change', { target: { value: 'Test' } })
    expect(updates).toBeGreaterThan(6)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      WasSentenced: { value: 'No' },
      AwaitingTrial: { value: 'Yes' },
      onUpdate: () => {
        updates += 1
      },
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
})
