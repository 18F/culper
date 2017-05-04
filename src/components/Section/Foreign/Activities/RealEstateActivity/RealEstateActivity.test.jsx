import React from 'react'
import { mount } from 'enzyme'
import RealEstateActivity from './RealEstateActivity'

describe('The RealEstateActivity component', () => {
  it('Renders without errors', () => {
    const component = mount(<RealEstateActivity />)
    expect(component.find('.realestate').length).toBe(1)
  })

  it('Updates with yes', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<RealEstateActivity onUpdate={onUpdate} />)
    expect(component.find('.realestate').length).toBe(1)
    component.find('.branch .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Renders summary information', () => {
    const expected = {
      HasInterests: 'Yes',
      List: [{
        RealEstateInterest: {
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
      }]
    }
    const component = mount(<RealEstateActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.interest strong').text()).toBe('Foo - John Doe')
  })

  it('Renders interest types summary information', () => {
    const expected = {
      HasInterests: 'Yes',
      List: [{
        RealEstateInterest: {
          InterestType: {
            value: 'Foo'
          },
          open: true
        }
      }]
    }
    const component = mount(<RealEstateActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(component.find('.interest strong').text()).toBe('Foo')
  })

  it('Renders with no', () => {
    const expected = {
      HasInterests: 'No'
    }
    const component = mount(<RealEstateActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('Renders full validated', () => {
    let status = false
    const expected = {
      onValidate: (event, s, error) => {
        status = s.realestate.status
      },
      HasInterests: 'Yes',
      List: [
        {
          RealEstateInterest: {
            InterestTypes: ['Yourself'],
            RealEstateType: {
              value: 'Bar'
            },
            Address: {
              addressType: 'United States',
              address: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202'
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
    const component = mount(<RealEstateActivity {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    expect(status).toBe(true)
  })
})
