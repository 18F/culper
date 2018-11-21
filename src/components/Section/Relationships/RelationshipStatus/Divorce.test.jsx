import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Divorce from './Divorce'

describe('The Divorce component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Divorce {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'divorce'
    }

    const component = createComponent(expected)
    expect(component.find('.divorce').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      Status: { value: 'Divorced' },
      BirthPlace: { country: { value: 'United States' } },
      DivorceLocation: { country: { value: 'United States' } },
      Deceased: { value: 'No' },
      onUpdate: () => {
        updates++
      }
    }

    const component = createComponent(expected)
    expect(component.find('.divorce').length).toEqual(1)

    component.find('.divorce .first input').simulate('change')
    component
      .find('.birthdate .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.birthplace .city input').simulate('change')
    component
      .find('.citizenship input')
      .simulate('change', { target: { value: 'Belg' } })
    component.find('.citizenship input').simulate('keydown', { keyCode: 13 })
    component
      .find('.recognized .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.location.birthplace .city input').simulate('change')
    component
      .find('.date-divorced .month input')
      .simulate('change', { target: { value: '12' } })
    component.find('.status .divorced input').simulate('change')
    component.find('.divorce-location .city input').simulate('change')
    component.find('.deceased .widowed input').simulate('change')
    component.find('.address-deceased .city input').simulate('change')
    component.find('.deceased-notapplicable .button input').simulate('change')
    expect(updates).toBe(12)
  })
})
