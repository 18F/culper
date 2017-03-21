import React from 'react'
import { mount } from 'enzyme'
import ForeignService from './ForeignService'

describe('The foreign service component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'foreign-service'
    }
    const component = mount(<ForeignService {...expected} />)
    expect(component.find('.foreign-service .organization-military label').length).toEqual(1)
    expect(component.find('.foreign-service-name input').length).toEqual(1)
    expect(component.find('.foreign-service-dates .datecontrol.from .month input').length).toEqual(1)
    expect(component.find('.foreign-service-country input').length).toEqual(1)
    expect(component.find('.foreign-service-rank input').length).toEqual(1)
    expect(component.find('.foreign-service-division input').length).toEqual(1)
    expect(component.find('.foreign-service-circumstances textarea').length).toEqual(1)
    expect(component.find('.foreign-service-left textarea').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'foreign-service',
      onUpdate: () => { updates++ }
    }
    const component = mount(<ForeignService {...expected} />)
    component.find('.foreign-service .organization-military label').simulate('change')
    component.find('.foreign-service-name input').simulate('change', { target: { value: 'The name' } })
    component.find('.foreign-service-dates .datecontrol.from .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.foreign-service-dates .datecontrol.from .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.foreign-service-dates .datecontrol.from .year input').simulate('change', { target: { name: 'year', value: '2001' } })
    component.find('.foreign-service-dates .datecontrol.to .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.foreign-service-dates .datecontrol.to .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.foreign-service-dates .datecontrol.to .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.foreign-service-country input').simulate('change', { target: { value: 'The country' } })
    component.find('.foreign-service-rank input').simulate('change', { target: { value: 'The rank' } })
    component.find('.foreign-service-division input').simulate('change', { target: { value: 'The division' } })
    component.find('.foreign-service-circumstances textarea').simulate('change', { target: { value: 'The circumstances' } })
    component.find('.foreign-service-left textarea').simulate('change', { target: { value: 'The reasons to leave' } })
    component.find('.foreign-service .maintainscontact .yes input').simulate('change')
    component.find('.foreign-service .maintainscontact .no input').simulate('change')
    expect(updates).toBeGreaterThan(8)
  })

  it('can display summary with values', () => {
    const tests = [
      {
        props: {
          name: 'foreign-service',
          MaintainsContact: 'Yes',
          List: [
            {
              Item: {
                Name: null,
                Dates: null
              }
            }
          ]
        },
        expected: ''
      },
      {
        props: {
          name: 'foreign-service',
          MaintainsContact: 'Yes',
          List: [
            {
              Item: {
                Name: null,
                Dates: {
                  from: {
                    date: new Date('1/1/2015')
                  },
                  to: {
                    date: new Date('1/1/2016')
                  }
                }
              }
            }
          ]
        },
        expected: '1/2015-1/2016'
      }
    ]

    for (const test of tests) {
      const component = mount(<ForeignService {...test.props} />)
      expect(component.find('.dates').text()).toBe(test.expected)
    }
  })
})
