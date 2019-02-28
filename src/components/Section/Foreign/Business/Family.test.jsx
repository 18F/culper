import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Family } from './Family'

describe('The foreign business family component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Family {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: { value: 'Yes' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      },
    }
    const component = createComponent(expected)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('blur')
    expect(validated).toBe(true)
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      HasForeignFamily: { value: 'Yes' },
      List: { items: [{}] },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.family-name .first input').simulate('change')
    component.find('.family-agency input').simulate('change')
    component.find('.family-country input').simulate('change')
    component.find('.family-date .day input').simulate('change')
    component.find('.family-circumstances textarea').simulate('change')
    expect(updates).toBe(5)
  })
})
