import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import UnauthorizedItem from './UnauthorizedItem'

describe('The legal investigations unauthorized item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <UnauthorizedItem {...expected} />
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
      .find('.legal-technology-unauthorized-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-unauthorized-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-unauthorized-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-unauthorized-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
