import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Offenses } from './Offenses'

describe('The Offenses record component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Offenses {...expected} />
        </Provider>
      )
    )
  })

  it('no error on empty', () => {
    const expected = {
      name: 'police-record',
    }
    const component = createComponent(expected)
    expect(component.find('.has-offenses').length).toEqual(1)
    expect(component.find('.offense').length).toEqual(0)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      name: 'police-record',
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.has-offenses').length).toEqual(1)
    component.find('.has-offenses .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('renders no offense if value is No', () => {
    const expected = {
      name: 'police-record',
      List: {
        items: [
          {
            Item: { Has: { value: 'No' } },
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.offense').length).toBe(0)
  })

  it('renders an offense with a value of Yes', () => {
    const expected = {
      name: 'police-record',
      List: {
        items: [
          {
            Item: { Has: { value: 'Yes' } },
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.offense').length).toBe(1)
  })
})
