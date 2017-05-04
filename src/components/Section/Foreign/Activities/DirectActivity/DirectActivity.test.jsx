import React from 'react'
import { mount } from 'enzyme'
import DirectActivity from './DirectActivity'

describe('The DirectActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<DirectActivity />)
    expect(component.find('.direct').length).toBe(1)
  })

  it('Updates with yes', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<DirectActivity onUpdate={onUpdate} />)
    expect(component.find('.direct').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders summary information', () => {
    const expected = {
      HasInterests: 'Yes',
      List: [{
        DirectInterest: {
          InterestType: {
            value: 'Foo'
          },
          InterestTypes: ['Yourself']
        },
        open: true
      }]
    }
    const component = mount(<DirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.interest strong').text()).toBe('Yourself - Foo')
  })

  it('Renders interest types summary information', () => {
    const expected = {
      HasInterests: 'Yes',
      List: [{
        DirectInterest: {
          InterestTypes: ['Yourself']
        },
        open: true
      }]
    }
    const component = mount(<DirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.interest strong').text()).toBe('Yourself')
  })

  it('Renders with no', () => {
    const expected = {
      HasInterests: 'No'
    }
    const component = mount(<DirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('Renders full validated', () => {
    let status = false
    const expected = {
      onValidate: (event, s, error) => {
        status = s.direct.status
      },
      HasInterests: 'Yes',
      List: [
        {
          DirectInterest: {
            InterestTypes: ['Yourself'],
            InterestType: {
              value: 'Some type'
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
            Value: {
              value: '100'
            },
            Relinquished: {
              day: '1',
              month: '1',
              year: '2016'
            },
            ReqlinquishedNotApplicable: {
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
    const component = mount(<DirectActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(status).toBe(true)
  })
})
