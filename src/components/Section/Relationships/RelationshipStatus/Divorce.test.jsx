import React from 'react'
import { mount } from 'enzyme'
import Divorce from './Divorce'

describe('The Divorce component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'divorce'
    }

    const component = mount(<Divorce {...expected} />)
    expect(component.find('.divorce').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => { updates++ }
    }

    const component = mount(<Divorce {...expected} />)
    expect(component.find('.divorce').length).toEqual(1)

    component.find('.divorce .first input').simulate('change')
    component.find('.birthdate .month input').simulate('change', { target: { value: '12' } })
    component.find('.birthplace .yes input').simulate('change')
    component.find('.telephone .home input').simulate('change')
    component.find('.recognized .month input').simulate('change', { target: { value: '12' } })
    component.find('.location .city input').simulate('change')
    component.find('.date-divorced .month input').simulate('change', { target: { value: '12' } })
    component.find('.status .divorced input').simulate('change')
    component.find('.deceased .yes input').simulate('change')
    component.find('.address-deceased .city input').simulate('change')
    component.find('.address-deceased .city input').simulate('change')
    component.find('.deceased-notapplicable .button input').simulate('change')
    expect(updates).toBe(12)
  })
})
