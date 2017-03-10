import React from 'react'
import { mount } from 'enzyme'
import Offense from './Offense'

describe('The offense component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'offense'
    }
    const component = mount(<Offense {...expected} />)
    expect(component.find('.offense-date').length).toEqual(2)
    expect(component.find('.offense-description').length).toEqual(1)
    expect(component.find('.offense-violence').length).toEqual(1)
    expect(component.find('.offense-firearms').length).toEqual(1)
    expect(component.find('.offense-substances').length).toEqual(1)
    expect(component.find('.offense-address').length).toEqual(1)
    expect(component.find('.offense-address').length).toEqual(1)
    expect(component.find('.offense-cited').length).toEqual(1)
    expect(component.find('.offense-citedby').length).toEqual(0)
    expect(component.find('.offense-agencyaddress .city').length).toEqual(0)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Offense {...expected} />)
    component.find('.offense-date .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.offense-date .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.offense-date .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.offense-description textarea').simulate('change', { target: { value: 'Some description' } })
    component.find('.offense-violence .yes input').simulate('change')
    component.find('.offense-firearms .yes input').simulate('change')
    component.find('.offense-substances .yes input').simulate('change')
    component.find('.offense-cited .yes input').simulate('change')
    component.find('.offense-citedby input').simulate('change', { target: { value: 'Some agency' } })
    component.find('.offense-agencyaddress .city input').simulate('change', { target: { value: 'The city' } })
    component.find('.offense-charged .yes input').simulate('change')
    expect(updates).toBeGreaterThan(6)
  })
})
