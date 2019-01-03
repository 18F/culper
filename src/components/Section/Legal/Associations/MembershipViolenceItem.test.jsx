import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import MembershipViolenceItem from './MembershipViolenceItem'

describe('The legal associations membership violence item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <MembershipViolenceItem {...expected} />
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
      .find('.legal-associations-violence-organization input')
      .simulate('change')
    component
      .find('.legal-associations-violence-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-violence-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-violence-positions input')
      .simulate('change')
    component
      .find('.legal-associations-violence-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-violence-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-violence-positions-na .button input')
      .simulate('change')
    component
      .find('.legal-associations-violence-contributions-na .button input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
