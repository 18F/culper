import React from 'react'
import { shallow, mount } from 'enzyme'
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
    const expected = {
      List: {
        branch: {},
        items: [
          {
            type: 'Gap',
            Item: {
              Dates: {
                from: {
                  day: '1',
                  month: '1',
                  year: '2013'
                },
                to: {
                  day: '12',
                  month: '31',
                  year: '2013'
                }
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  day: '1',
                  month: '1',
                  year: '2014'
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018'
                }
              }
            }
          }
        ]
      },
      onUpdate: jest.fn()
    }
    const component = createComponent(expected)
    expect(expected.onUpdate.mock.calls.length).toBe(1)
  })

  it('sorts employment items with most recent being first', () => {
    const mockStore = configureMockStore()
    const store = mockStore()
    const props = {
      List: {
        branch: {},
        items: [
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2005'
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2007'
                }
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2000'
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2004'
                }
              }
            }
          },
          {
            Item: {
              Dates: {
                from: {
                  day: '10',
                  month: '10',
                  year: '2014'
                },
                to: {
                  day: '1',
                  month: '1',
                  year: '2018'
                }
              }
            }
          }
        ]
      }
    }

    const component = shallow(
      <Provider store={store}>
        <Employment {...props} />
      </Provider>
    )
    const sortedEmploymentItems = component
      .dive()
      .instance()
      .sortEmploymentItems(props.List.items)

    expect(sortedEmploymentItems[0].Item.Dates.to.year).toEqual('2018')
    expect(sortedEmploymentItems[1].Item.Dates.to.year).toEqual('2007')
    expect(sortedEmploymentItems[2].Item.Dates.to.year).toEqual('2004')
  })
})
