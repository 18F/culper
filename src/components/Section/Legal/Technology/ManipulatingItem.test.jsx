import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ManipulatingItem from './ManipulatingItem'

describe('The legal investigations unauthorized item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ManipulatingItem {...expected} />
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
      .find('.legal-technology-manipulating-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-manipulating-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-manipulating-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-manipulating-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
