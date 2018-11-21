import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import HistoryItem from './HistoryItem'

describe('The legal investigations history item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <HistoryItem {...expected} />
        </Provider>
      )
  })

  it('can select values', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find(
        '.legal-investigations-history-agency .investigative-agency-dod input'
      )
      .simulate('change')
    component
      .find('.legal-investigations-history-agency-notapplicable .button input')
      .simulate('change')
    component
      .find('.legal-investigations-history-completed .year input')
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-completed-notapplicable .button input'
      )
      .simulate('change')
    component
      .find('.legal-investigations-history-issued input')
      .simulate('change')
    component
      .find('.legal-investigations-history-granted .year input')
      .simulate('change')
    component
      .find('.legal-investigations-history-granted-notapplicable .button input')
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-clearance .clearance-level-none input'
      )
      .simulate('change')
    component
      .find(
        '.legal-investigations-history-clearance-notapplicable .button input'
      )
      .simulate('change')
    expect(updates).toBe(9)
  })
})
