import React from 'react'
import { mount } from 'enzyme'
import SummaryCounter from './SummaryCounter'

describe('The SummaryCounter component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'summary'
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools').text()).toEqual('0')
    expect(component.find('.diplomas').text()).toEqual('0')
  })

  it('can display count of schools attended', () => {
    const expected = {
      name: 'summary',
      schools: () => {
        return [
          {
            to: {
              month: '6',
              day: '1',
              year: '1982'
            },
            from: {
              month: '6',
              day: '1',
              year: '1980'
            }
          },
          {
            to: {
              month: '6',
              day: '1',
              year: '1984'
            },
            from: {
              month: '6',
              day: '1',
              year: '1982'
            }
          }
        ]
      }
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools').text()).toEqual('2')
    expect(component.find('.diplomas').text()).toEqual('0')
  })

  it('can display count of diplomas received', () => {
    const expected = {
      name: 'summary',
      diplomas: () => {
        return [
          {
            month: '6',
            day: '1',
            year: '1982'
          }
        ]
      }
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools').text()).toEqual('0')
    expect(component.find('.diplomas').text()).toEqual('1')
  })
})
