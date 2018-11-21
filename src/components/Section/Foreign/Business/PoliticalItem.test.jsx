import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import PoliticalItem from './PoliticalItem'

describe('The foreign business political component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <PoliticalItem {...expected} />
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
    component
      .find('.foreign-business-political-position input')
      .simulate('change')
    component
      .find('.foreign-business-political-dates .to .day input')
      .simulate('change')
    component
      .find('.foreign-business-political-country input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-business-political-reason textarea')
      .simulate('change')
    component
      .find('.foreign-business-political-eligibility input')
      .simulate('change')
    expect(updates).toBe(5)
  })
})
