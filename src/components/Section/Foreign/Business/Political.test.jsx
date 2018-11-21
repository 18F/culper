import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Political from './Political'

describe('The foreign business political component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Political {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-political',
      HasForeignPolitical: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-political',
      HasForeignPolitical: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-political',
      HasForeignPolitical: { value: 'Yes' },
      onError: (value, arr) => {
        validated = true
        return arr
      }
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
      name: 'foreign-business-political',
      HasForeignPolitical: { value: 'Yes' },
      List: {
        items: [
          {
            Position: {},
            Dates: {},
            Country: {},
            Reason: {},
            Eligibility: {}
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component
      .find('.foreign-business-political-position input')
      .simulate('change')
    component
      .find('.foreign-business-political-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-political-country input')
      .simulate('change')
    component
      .find('.foreign-business-political-reason textarea')
      .simulate('change')
    component
      .find('.foreign-business-political-eligibility input')
      .simulate('change')
    expect(updates).toBe(5)
  })
})
