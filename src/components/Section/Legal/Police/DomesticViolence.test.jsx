import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DomesticViolence from './DomesticViolence'

describe('The DomesticViolence  component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DomesticViolence {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'sentence'
    }
    const component = createComponent(expected)
    expect(component.find('.explanation').length).toEqual(1)
    expect(component.find('.domestic-courtname').length).toEqual(1)
    expect(component.find('.domestic-courtaddress').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'sentence',
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)

    const selectors = [
      '.explanation textarea',
      { type: 'text', name: 'street' },
      { type: 'text', name: 'CourtName' },
      { type: 'text', name: 'month' }
    ]

    selectors.forEach(selector => {
      component.find(selector).simulate('change', { target: { value: '1' } })
    })

    expect(updates).toEqual(4)
  })
})
