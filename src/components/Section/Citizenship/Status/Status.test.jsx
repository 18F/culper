import React from 'react'
import { mount } from 'enzyme'
import Status from './Status'

describe('The status component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'status'
    }
    const component = mount(<Status {...expected} />)
    expect(component.find('.citizenship-status').length).toBe(1)
    expect(component.find('.block').length).toBeGreaterThan(0)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'status',
      onUpdate: (obj) => {
        updates++
      }
    }
    const component = mount(<Status {...expected} />)
    component.find('.citizenship-status-citizen input').simulate('change')
    component.find('.citizenship-status-foreignborn input').simulate('change')
    component.find('.citizenship-status-naturalized input').simulate('change')
    component.find('.citizenship-status-derived input').simulate('change')
    component.find('.citizenship-status-notcitizen input').simulate('change')
    expect(updates).toBeGreaterThan(4)
  })
})
