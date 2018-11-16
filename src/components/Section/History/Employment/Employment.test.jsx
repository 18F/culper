import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Employment from './Employment'

describe('The employment section', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <Employment {...expected} />
        </Provider>
      )
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  day: '1',
                  month: '1',
                  year: '2014',
                  date: new Date('1/1/2014')
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018',
                  date: new Date('1/1/2018')
                }
              }
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(updates).toBe(1)
  })
})
