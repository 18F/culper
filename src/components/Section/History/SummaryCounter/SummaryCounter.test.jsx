import React from 'react'
import { mount } from 'enzyme'
import SummaryCounter from './SummaryCounter'

describe('The SummaryCounter component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'summary',
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools.total').text()).toEqual('0')
    expect(component.find('.diplomas.total').text()).toEqual('0')
  })

  it('can display count of schools attended', () => {
    const expected = {
      name: 'summary',
      schoolCount: 2,
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools.total').text()).toEqual('2')
    expect(component.find('.diplomas.total').text()).toEqual('0')
  })

  it('can display count of diplomas received', () => {
    const expected = {
      name: 'summary',
      diplomaCount: 1,
    }
    const component = mount(<SummaryCounter {...expected} />)
    expect(component.find('.schools.total').text()).toEqual('0')
    expect(component.find('.diplomas.total').text()).toEqual('1')
  })
})
