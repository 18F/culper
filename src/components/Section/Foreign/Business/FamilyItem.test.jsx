import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import FamilyItem from './FamilyItem'

describe('The family item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <FamilyItem {...expected} />
        </Provider>
      )
  })

  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-family',
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('.family-name .first input').simulate('change')
    component.find('.family-agency input').simulate('change')
    component
      .find('.family-country .react-autosuggest__container input')
      .simulate('change', { target: { value: 'C' } })
    component.find('.family-date .day input').simulate('change')
    component.find('.family-circumstances textarea').simulate('change')
    expect(updates).toBe(5)
  })
})
