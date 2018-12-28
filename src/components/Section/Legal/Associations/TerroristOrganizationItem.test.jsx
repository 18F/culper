import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import TerroristOrganizationItem from './TerroristOrganizationItem'

describe('The legal associations terrorist organization item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <TerroristOrganizationItem {...expected} />
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
      .find('.legal-associations-terrorist-organization input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-address .city input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-dates .from .year input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-positions input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-contributions input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-reasons textarea')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-positions-na .button input')
      .simulate('change')
    component
      .find('.legal-associations-terrorist-contributions-na .button input')
      .simulate('change')
    expect(updates).toBe(8)
  })
})
