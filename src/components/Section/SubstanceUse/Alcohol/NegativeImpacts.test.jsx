import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import NegativeImpacts from './NegativeImpacts'

describe('The NegativeImpacts component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <NegativeImpacts {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.negative-impacts').length).toBe(1)
  })

  it('Updates branch', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.negative-impacts').length).toBe(1)
    component.find('.has-impacts .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Updates item in accordion', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      HasImpacts: { value: 'Yes' },
      List: {
        branch: {
          value: 'No'
        },
        items: [
          {
            Item: {
              Occurred: {
                month: '1',
                year: '2010'
              },
              Circumstances: {
                value: 'Foo'
              },
              NegativeImpact: {
                value: 'Bar'
              },
              Used: {
                from: {
                  month: '1',
                  day: '1',
                  year: '2010'
                },
                to: {
                  month: '1',
                  day: '1',
                  year: '2012'
                },
                present: false
              }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    component.find('textarea[name="Circumstances"]').simulate('change')
    expect(updates).toBe(2)
  })
})
