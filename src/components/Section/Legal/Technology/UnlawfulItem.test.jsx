import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import UnlawfulItem from './UnlawfulItem'

describe('The legal investigations unlawful item component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <UnlawfulItem {...expected} />
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
      .find('.legal-technology-unlawful-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-unlawful-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-unlawful-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-unlawful-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
