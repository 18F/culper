import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import VotingItem from './VotingItem'

describe('The foreign business voting item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <VotingItem {...expected} />
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
      .find('.foreign-business-voting-date .day input')
      .simulate('change')
    component
      .find('.foreign-business-voting-country input')
      .simulate('change', { target: { value: 'United States' } })
    component
      .find('.foreign-business-voting-reason textarea')
      .simulate('change')
    component
      .find('.foreign-business-voting-eligibility input')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
