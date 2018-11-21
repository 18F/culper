import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Order from './Order'

describe('The Order component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Order {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.order').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.order').length).toBe(1)
    component
      .find('.datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('input[name="CourtName"]').simulate('change')
    component.find('input[name="street"]').simulate('change')
    component.find('.appeals .yes input').simulate('change')
    component.find('.disposition input').simulate('change')
    expect(updates).toBe(5)
  })
})
