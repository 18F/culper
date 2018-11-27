import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Sponsorship from './Sponsorship'

describe('The foreign business sponsorship component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Sponsorship {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' },
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
      name: 'foreign-business-sponsorship',
      HasForeignSponsorship: { value: 'Yes' },
      List: {
        items: [
          {
            Name: {},
            Birthdate: {},
            Birthplace: {},
            Address: {},
            Citizenship: {},
            Organization: {},
            Dates: {},
            Residence: {},
            Stay: {},
            Sponsorship: {}
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
      .find('.foreign-business-sponsorship-name .first input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-birthdate .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-address .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-citizenship input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-organization input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-residence .city input')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-stay textarea')
      .simulate('change')
    component
      .find('.foreign-business-sponsorship-sponsorship textarea')
      .simulate('change')
    expect(updates).toBe(9)
  })
})
