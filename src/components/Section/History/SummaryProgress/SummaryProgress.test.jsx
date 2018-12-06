import React from 'react'
import { mount } from 'enzyme'
import SummaryProgress from './SummaryProgress'

describe('The SummaryProgress component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'summary',
      List: () => {}
    }
    const component = mount(<SummaryProgress {...expected} />)
    expect(component.find('.progress').length).toEqual(1)
    expect(component.find('.filled').length).toEqual(0)
  })

  it('can display filled progress', () => {
    const expected = {
      name: 'summary',
      List: () => {
        return [
          {
            to: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}`,
              year: `${new Date().getFullYear()}`
            },
            from: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}` - 2,
              year: `${new Date().getFullYear()}`
            }
          },
          {
            to: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}` - 6,
              year: `${new Date().getFullYear()}`
            },
            from: {
              month: `${new Date().getMonth() + 1}`,
              day: `${new Date().getDate()}` - 12,
              year: `${new Date().getFullYear()}`
            }
          }
        ]
      }
    }
    const component = mount(<SummaryProgress {...expected} />)
    expect(component.find('.progress').length).toEqual(1)
    expect(component.find('.filled').length).toEqual(2)
  })
})
