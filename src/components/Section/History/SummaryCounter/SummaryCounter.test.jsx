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
              date: new Date()
            },
            from: {
              date: new Date(new Date() - 2)
            }
          },
          {
            to: {
              date: new Date(new Date() - 6)
            },
            from: {
              date: new Date(new Date() - 12)
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
            date: new Date(new Date() - 6)
          }
        ]
      }
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools').text()).toEqual('0')
    expect(component.find('.diplomas').text()).toEqual('1')
  })
})
