import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import GamblingItem from './GamblingItem'

describe('The GamblingItem component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <GamblingItem {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.gambling-item').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component
      .find('.dates .from input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component.find('.losses input').simulate('change')
    component.find('.description textarea').simulate('change')
    component.find('.actions textarea').simulate('change')
    expect(updates).toBe(4)
  })

  it('defaults behave as expected', () => {
    expect(GamblingItem.defaultProps.onError(0, [])).toEqual([])
    expect(GamblingItem.defaultProps.onUpdate()).toBe(undefined)
  })
})
