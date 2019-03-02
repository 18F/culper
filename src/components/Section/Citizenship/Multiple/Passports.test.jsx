import React from 'react'
import { mount } from 'enzyme'
import { Passports } from './Passports'

describe('The multiple component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'multiple'
    }
    const component = mount(<Passports {...expected} />)
    expect(component.find('.passports').length).toBe(1)
    expect(component.find('.has-foreignpassport').length).toBe(1)
  })

  it('can trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'multiple',
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Passports {...expected} />)
    component.find('.has-foreignpassport .yes input').simulate('change')
    expect(updates).toBe(1)
  })
})
