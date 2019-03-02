import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Education } from './Education'

describe('The Education component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Education {...expected} />
        </Provider>
      )
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'education',
    }

    const component = createComponent(expected)
    expect(component.find('.education').length).toEqual(1)
  })

  it('no error on with items', () => {
    const expected = {
      name: 'education',
      List: {
        items: [
          {
            Item: {},
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.education').length).toEqual(2)
  })
})
