import React from 'react'
import { mount } from 'enzyme'
import Procedure from './Procedure'

describe('The procedure component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'procedure'
    }
    const component = mount(<Procedure {...expected} />)
    expect(component.find('.procedure-date').length).toEqual(1)
    expect(component.find('.procedure-offenses').length).toEqual(1)
    expect(component.find('.procedure-name').length).toEqual(1)
    expect(component.find('.procedure-court').length).toEqual(1)
    expect(component.find('.procedure-outcome').length).toEqual(1)
  })

  it('trigger updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'procedure',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Procedure {...expected} />)
    component
      .find('.procedure-date .month input')
      .simulate('change', { target: { name: 'month', value: '1' } })
    component
      .find('.procedure-date .year input')
      .simulate('change', { target: { name: 'year', value: '2005' } })
    component
      .find('.procedure-offenses textarea')
      .simulate('change', { target: { value: 'The offenses' } })
    component
      .find('.procedure-name input')
      .simulate('change', { target: { value: 'The name' } })
    component
      .find('.procedure-court textarea')
      .simulate('change', { target: { value: 'The court' } })
    component
      .find('.procedure-outcome input')
      .simulate('change', { target: { value: 'The outcome' } })
    expect(updates).toBeGreaterThan(5)
  })
})
