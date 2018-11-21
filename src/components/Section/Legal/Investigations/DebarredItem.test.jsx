import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DebarredItem from './DebarredItem'

describe('The legal investigations debarred item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DebarredItem {...expected} />
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
      .find('.legal-investigations-debarred-date .year input')
      .simulate('change')
    component
      .find('.legal-investigations-debarred-agency input')
      .simulate('change')
    component
      .find('.legal-investigations-debarred-explanation textarea')
      .simulate('change')
    expect(updates).toBe(3)
  })
})
