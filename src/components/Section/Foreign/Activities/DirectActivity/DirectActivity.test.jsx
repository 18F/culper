import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DirectActivity } from './DirectActivity'

describe('The DirectActivity component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DirectActivity {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.direct').length).toBe(1)
  })

  it('Updates with yes', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    expect(component.find('.direct').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders summary information', () => {
    const expected = {
      HasInterests: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              InterestType: {
                value: 'Foo',
              },
              InterestTypes: {
                values: ['Yourself'],
              },
            },
            open: true,
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.context strong').text()).toBe('Yourself - Foo')
  })

  it('Renders interest types summary information', () => {
    const expected = {
      HasInterests: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              InterestTypes: {
                values: ['Yourself'],
              },
            },
            open: true,
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.context strong').text()).toBe('Yourself')
  })

  it('Renders with no', () => {
    const expected = {
      HasInterests: { value: 'No' },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('Renders full validated', () => {
    let status = false
    const expected = {
      onError: (value, arr) => {
        status = true
        return arr
      },
      HasInterests: { value: 'Yes' },
      List: {
        branch: {
          value: 'No',
        },
        items: [
          {
            Item: {
              InterestTypes: {
                values: ['Yourself'],
              },
              InterestType: {
                value: 'Some type',
              },
              Acquired: {
                day: '1',
                month: '1',
                year: '2016',
              },
              HowAcquired: {
                value: 'foo',
              },
              Cost: {
                value: '100',
              },
              Value: {
                value: '100',
              },
              Relinquished: {
                day: '1',
                month: '1',
                year: '2016',
              },
              ReqlinquishedNotApplicable: {
                applicable: true,
              },
              Explanation: {
                value: 'Bar',
              },
              CoOwners: {
                List: {
                  items: [{ Item: { Has: { value: 'No' } } }],
                },
              },
            },
          },
        ],
      },
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(status).toBe(true)
  })
})
