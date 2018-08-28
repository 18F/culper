import React from 'react'
import { mount } from 'enzyme'
import IndirectActivity from './IndirectActivity'

describe('The IndirectActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<IndirectActivity />)
    expect(component.find('.indirect').length).toBe(1)
  })

  it('Updates with yes', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<IndirectActivity onUpdate={onUpdate} />)
    expect(component.find('.indirect').length).toBe(1)
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
                value: 'Foo'
              },
              Firstname: {
                value: 'John'
              },
              Lastname: {
                value: 'Doe'
              }
            },
            open: true
          }
        ]
      }
    }
    const component = mount(<IndirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.context strong').text()).toBe('Foo - John Doe')
  })

  it('Renders interest types summary information', () => {
    const expected = {
      HasInterests: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              InterestType: {
                value: 'Foo'
              },
              open: true
            }
          }
        ]
      }
    }
    const component = mount(<IndirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.context strong').text()).toBe('Foo')
  })

  it('Renders with no', () => {
    const expected = {
      HasInterests: { value: 'No' }
    }
    const component = mount(<IndirectActivity {...expected} />)
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
        branch: { value: 'No' },
        items: [
          {
            Item: {
              InterestTypes: ['Yourself'],
              InterestType: {
                value: 'Some type'
              },
              Acquired: {
                day: '1',
                month: '1',
                year: '2016'
              },
              Firstname: {
                value: 'John'
              },
              Lastname: {
                value: 'Doe'
              },
              Relationship: {
                value: 'A person'
              },
              HowAcquired: {
                value: 'foo'
              },
              Cost: {
                value: '100'
              },
              Value: {
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
              Explanation: {
                value: 'Bar'
              },
              CoOwners: {
                List: [{ Has: 'No' }]
              }
            }
          }
        ]
      }
    }
    const component = mount(<IndirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(status).toBe(true)
  })
})
