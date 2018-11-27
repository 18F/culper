import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ConferencesItem from './ConferencesItem'

describe('The conferences item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ConferencesItem {...expected} />
        </Provider>
      )
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.conferences-description textarea').simulate('change')
    component.find('.conferences-sponsor input').simulate('change')
    component.find('.conferences-city input').simulate('change')
    component
      .find('.conferences-country input')
      .simulate('change', { target: { value: 'United States' } })
    component.find('.conferences-dates .to .day input').simulate('change')
    component.find('.conferences-purpose textarea').simulate('change')
    expect(updates).toBe(6)
  })

  it('trigger with subsequent contact equal to yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      Contacts: {
        List: {
          items: [{ Item: { Has: { value: 'Yes' } } }]
        }
      }
    }
    const component = createComponent(expected)
    component.find('.conferences-explanation textarea').simulate('change')
    expect(updates).toBe(1)
  })
})
