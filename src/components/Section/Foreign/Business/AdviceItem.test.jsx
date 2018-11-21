import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AdviceItem from './AdviceItem'

describe('The advice item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <AdviceItem {...expected} />
        </Provider>
      )
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-advice',
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.advice-description textarea').simulate('change')
    component.find('.advice-name .first input').simulate('change')
    component.find('.advice-organization input').simulate('change')
    component.find('.advice-dates .to .day input').simulate('change')
    component.find('.advice-compensation textarea').simulate('change')
    component
      .find('.advice-country .react-autosuggest__container input')
      .simulate('change', { target: { value: 'C' } })
    expect(updates).toBe(6)
  })
})
