import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import RevokedItem from './RevokedItem'

describe('The legal investigations revoked item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <RevokedItem {...expected} />
        </Provider>
      )
  })

  it('can update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.legal-investigations-revoked-date .year input')
      .simulate('change')
    component
      .find('.legal-investigations-revoked-agency input')
      .simulate('change')
    component
      .find('.legal-investigations-revoked-explanation textarea')
      .simulate('change')
    expect(updates).toBe(3)
  })
})
