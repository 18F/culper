import React from 'react'
import { mount } from 'enzyme'
import ForeignContact from './ForeignContact'

describe('The foreign contact component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'foreign-contact'
    }
    const component = mount(<ForeignContact {...expected} />)
    expect(component.find('.foreign-contact-name .first input').length).toEqual(1)
    expect(component.find('.foreign-contact-address .city input').length).toEqual(1)
    expect(component.find('.foreign-contact-title input').length).toEqual(1)
    expect(component.find('.foreign-contact-dates .datecontrol.from .month input').length).toEqual(1)
    expect(component.find('.foreign-contact-frequency input').length).toEqual(1)
  })

  it('trigger updates when chaging values', () => {
    let updates = 0
    const expected = {
      name: 'foreign-contact',
      onUpdate: () => { updates++ }
    }
    const component = mount(<ForeignContact {...expected} />)
    component.find('.foreign-contact-name .first input').simulate('change', { target: { value: 'The name' } })
    component.find('.foreign-contact-address .city input').simulate('change', { target: { value: 'The city' } })
    component.find('.foreign-contact-title input').simulate('change', { target: { value: 'The title' } })
    component.find('.foreign-contact-dates .datecontrol.from .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.foreign-contact-dates .datecontrol.from .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.foreign-contact-dates .datecontrol.from .year input').simulate('change', { target: { name: 'year', value: '2001' } })
    component.find('.foreign-contact-dates .datecontrol.to .month input').simulate('change', { target: { name: 'month', value: '1' } })
    component.find('.foreign-contact-dates .datecontrol.to .day input').simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.foreign-contact-dates .datecontrol.to .year input').simulate('change', { target: { name: 'year', value: '2005' } })
    component.find('.foreign-contact-frequency input').simulate('change', { target: { value: 'Monthly' } })
    expect(updates).toBeGreaterThan(8)
  })
})
