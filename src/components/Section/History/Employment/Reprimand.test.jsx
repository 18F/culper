import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Reprimand from './Reprimand'

describe('The reprimand component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Reprimand {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'bad_dog'
    }
    const component = createComponent(expected)
    expect(component.find('.option-list').length).toBe(1)
  })

  it('loads values', () => {
    let updates = 0
    const expected = {
      name: 'bad_dog',
      items: [{ Item: { Has: { value: 'Yes' } } }],
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find({ name: 'Text' }).simulate('change')
    component
      .find({ name: 'month' })
      .simulate('change', { target: { value: '1' } })
    expect(updates).toBe(2)
  })

  it('handles defaults', () => {
    expect(Reprimand.defaultProps.onUpdate()).toEqual(undefined)
    expect(Reprimand.defaultProps.onError(null, [])).toEqual([])
  })
})
