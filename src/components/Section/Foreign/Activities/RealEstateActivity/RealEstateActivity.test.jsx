import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import Location from 'components/Form/Location'
import { RealEstateActivity } from './RealEstateActivity'

describe('The RealEstateActivity component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <RealEstateActivity {...expected} />
        </Provider>
      )
  })

  xit('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.realestate').length).toBe(1)
  })

  xit('Updates with yes', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }

    const component = createComponent({ onUpdate: onUpdate })
    expect(component.find('.realestate').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
  })

  xit('Renders summary information', () => {
    const expected = {
      HasInterests: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              InterestTypes: { values: ['Yourself'] }
            },
            open: true
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.context strong').text()).toBe('Yourself')
  })

  xit('Renders interest types summary information', () => {
    const tests = [
      {
        props: {
          HasInterests: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  InterestTypes: { values: ['Yourself'] },
                  Address: {
                    country: { value: ['United States'] },
                    street: '1234 Some Rd',
                    city: 'Arlington',
                    state: 'VA',
                    zipcode: '22202',
                    layout: Location.ADDRESS
                  },
                  open: true
                }
              }
            ]
          }
        },
        expected: 'Yourself - 1234 some rd, arlington, VA 22202'
      },
      {
        props: {
          HasInterests: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  InterestTypes: { values: ['Yourself'] },
                  Address: {
                    street: '1 Rd',
                    city: 'Munich',
                    country: { value: ['Germany'] },
                    layout: Location.ADDRESS
                  },
                  open: true
                }
              }
            ]
          }
        },
        expected: 'Yourself - 1 rd, munich, germany'
      },
      {
        props: {
          HasInterests: { value: 'Yes' },
          List: {
            items: [
              {
                Item: {
                  InterestTypes: { values: ['Yourself'] },
                  Address: {
                    country: { value: ['United States'] },
                    street: '1 Rd',
                    city: 'APO',
                    state: 'AA',
                    zipcode: '22222',
                    layout: Location.ADDRESS
                  },
                  open: true
                }
              }
            ]
          }
        },
        expected: 'Yourself - 1 rd, apo, AA 22222'
      }
    ]

    tests.forEach(test => {
      const component = createComponent({ ...test.props })
      expect(component.find('.accordion').length).toBe(1)
      expect(component.find('.context strong').text()).toBe(test.expected)
    })
  })

  xit('Renders with no', () => {
    const expected = {
      HasInterests: { value: 'No' }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(0)
  })

  xit('Renders full validated', () => {
    let status = false
    const expected = {
      onError: (value, arr) => {
        status = true
        return arr
      },
      HasInterests: { value: 'Yes' },
      List: {
        branch: { value: 'No' },
        items: [
          {
            Item: {
              InterestTypes: ['Yourself'],
              RealEstateType: {
                value: 'Bar'
              },
              Address: {
                country: { value: ['United States'] },
                street: '1234 Some Rd',
                city: 'Arlington',
                state: 'VA',
                zipcode: '22202',
                layout: Location.ADDRESS
              },
              Acquired: {
                day: '1',
                month: '1',
                year: '2016'
              },
              HowAcquired: {
                value: 'foo'
              },
              Cost: {
                value: '100'
              },
              Sold: {
                day: '1',
                month: '1',
                year: '2016'
              },
              SoldNotApplicable: {
                applicable: true
              },
              CoOwners: {
                List: [{ Has: 'No' }]
              }
            }
          }
        ]
      }
    }
    const component = createComponent(expected)
    expect(component.find('.accordion').length).toBe(1)
    expect(status).toBe(true)
  })
})
