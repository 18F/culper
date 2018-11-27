import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import AdditionalActivity from './AdditionalActivity'

describe('The employment additional activity component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <AdditionalActivity {...expected} />
        </Provider>
      )
  })

  it('renders default additional activity', () => {
    const component = createComponent()
    expect(component.find('.branch .yes').length).toBe(1)
    expect(component.find('.branch .no').length).toBe(1)
  })

  it('loads data', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      items: [
        {
          Item: {
            Has: { value: 'Yes' },
            Position: {
              name: 'Position',
              value: 'Dev'
            }
          }
        }
      ]
    }

    const component = createComponent(expected)
    component
      .find('.branch .yes input')
      .at(0)
      .simulate('change')
    component.find({ type: 'text', name: 'Position' }).simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
