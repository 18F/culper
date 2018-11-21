import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import NegativeImpact from './NegativeImpact'

describe('The NegativeImpact component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <NegativeImpact {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.negative-impact').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.negative-impact').length).toBe(1)
    component
      .find('.occurred .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    component.find('textarea[name="Circumstances"]').simulate('change')
    component.find('textarea[name="NegativeImpact"]').simulate('change')
    component
      .find('.used .datecontrol .year input')
      .first()
      .simulate('change', { target: { value: '2010' } })
    expect(updates).toBe(4)
  })
})
