import React from 'react'
import { mount } from 'enzyme'
import Relatives from './Relatives'

describe('The relatives component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Relatives {...expected} />)
    expect(component.find('.relatives-relation').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting relations displays accordion', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Relatives {...expected} />)
    expect(component.find('.relatives-relation').length).toEqual(1)
    component.find({ type: 'checkbox', value: 'Mother' }).simulate('change')
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      onUpdate: (obj) => {
        updates++
      }
    }
    const component = mount(<Relatives {...expected} />)
    component.find({ type: 'checkbox', value: 'Mother' }).simulate('change')
    component.find('.relative-name .first input').simulate('change', { target: { name: 'first', value: 'The name' } })
    component.find('.relative-name .first input').simulate('change', { target: { name: 'first', value: '123123123' } })
    expect(updates).toBeGreaterThan(1)
  })
})
