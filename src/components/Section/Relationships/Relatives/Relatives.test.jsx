import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Relatives from './Relatives'

describe('The relatives component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Relatives {...expected} />
        </Provider>
      )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Relatives {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('triggers updates when changing values', () => {
    const expected = {
      name: 'relatives',
      List: {
        items: [{ Item: { Relation: { value: 'Mother' } } }]
      },
      onUpdate: jest.fn()
    }
    const component = createComponent(expected)
    component.find({ type: 'radio', value: 'Mother' }).simulate('change')
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: '123123123' } })
    expect(expected.onUpdate.mock.calls.length).toEqual(4)
  })
})
