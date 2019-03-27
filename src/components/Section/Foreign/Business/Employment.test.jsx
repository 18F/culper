import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Employment } from './Employment'

describe('The foreign business employment component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Employment {...expected} />
        </Provider>
      )
  })

  it('display nothing when "no" is clicked', () => {
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('display content when "yes" is clicked', () => {
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: { value: 'Yes' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('handle validations', () => {
    let validated = false
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: { value: 'Yes' },
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
      name: 'foreign-business-employment',
      HasForeignEmployment: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Address: { country: { value: 'United States' } },
              Accepted: { value: 'Yes' },
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
    updates = 0
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .city input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(6)
  })
})
