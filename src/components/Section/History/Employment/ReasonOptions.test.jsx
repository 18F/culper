import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ReasonOptions from './ReasonOptions'

describe('The reason options component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <ReasonOptions {...expected} />
        </Provider>
      )
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'peace_i_am_out',
      Reason: { value: 'Fired' },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    component.find('textarea').simulate('change')
    component
      .find({ type: 'text', name: 'month' })
      .simulate('change', { target: { value: '1' } })
    component.find({ type: 'radio', value: 'Quit' }).simulate('change')
    expect(updates).toBe(3)
  })
})
