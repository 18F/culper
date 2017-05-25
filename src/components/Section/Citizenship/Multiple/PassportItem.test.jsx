import React from 'react'
import { mount } from 'enzyme'
import PassportItem from './PassportItem'

describe('The passport item component', () => {
  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'passportItem',
      onUpdate: () => { updates++ }
    }
    const component = mount(<PassportItem {...expected} />)
    component.find('.country input').simulate('change', { target: { name: 'Country', value: 'United States' } })
    component.find('.passport-issued .day input').first().simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.passport-location .mailing input').simulate('change')
    component.find('.passport-name input').first().simulate('change')
    component.find('.passport-number input').first().simulate('change')
    component.find('.passport-expiration .day input').first().simulate('change', { target: { name: 'day', value: '1' } })
    component.find('.passport-used .yes input').simulate('change')
    expect(updates).toBe(8)
  })
})
