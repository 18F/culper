import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Conferences } from './Conferences'

describe('The foreign business conferences component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Conferences {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-conferences',
      HasForeignConferences: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-conferences',
      HasForeignConferences: { value: 'Yes' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-conferences',
      HasForeignConferences: { value: 'Yes' },
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
      name: 'foreign-business-conferences',
      HasForeignConferences: { value: 'Yes' },
      List: {
        items: [
          {
            Contacts: {
              List: { items: [{ Has: { value: 'Yes' } }] },
            },
          },
        ],
      },
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.conferences-description textarea').simulate('change')
    component.find('.conferences-sponsor input').simulate('change')
    component.find('.conferences-city input').simulate('change')
    component.find('.conferences-country input').simulate('change')
    component.find('.conferences-dates .to .day input').simulate('change')
    component.find('.conferences-purpose textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
