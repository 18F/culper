import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import MembershipOverthrowItem from './MembershipOverthrowItem'

describe('The legal associations membership overthrow item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <MembershipOverthrowItem {...expected} />
        </Provider>
      )
  })

  it('can select "yes"', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.legal-associations-overthrow-organization input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-positions input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-positions-na .block label input')
      .simulate('change')
    component
      .find('.legal-associations-overthrow-contributions-na .block label input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
