import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import TravelItem from './TravelItem'

describe('The travel item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <TravelItem {...expected} />
        </Provider>
      )
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'travelItem',
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.travel-item-country .country input').simulate('change', {
      target: { name: 'Country', value: 'United States' }
    })
    component.find('.travel-item-dates .to .year input').simulate('change')
    expect(updates).toBe(2)
  })
})
