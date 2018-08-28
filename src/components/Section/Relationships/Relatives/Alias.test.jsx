import React from 'react'
import { mount } from 'enzyme'
import Alias from './Alias'

describe('The relative alias component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relative-alias'
    }

    const component = mount(<Alias {...expected} />)
    expect(component.find('.alias-name').length).toEqual(1)
    expect(component.find('.alias-maiden').length).toEqual(1)
    expect(component.find('.alias-dates').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'relative-alias',
      onUpdate: obj => {
        updates++
      }
    }

    const component = mount(<Alias {...expected} />)
    component
      .find('.alias-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component.find('.alias-maiden .yes input').simulate('change')
    component
      .find('.alias-dates .datecontrol.from .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.alias-dates .datecontrol.from .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.alias-dates .datecontrol.from .year input')
      .simulate('change', { target: { name: 'year', value: '2001' } })
    component
      .find('.alias-dates .datecontrol.to .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.alias-dates .datecontrol.to .day input')
      .simulate('change', { target: { name: 'day', value: '1' } })
    component
      .find('.alias-dates .datecontrol.to .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    expect(updates).toBeGreaterThan(6)
  })
})
