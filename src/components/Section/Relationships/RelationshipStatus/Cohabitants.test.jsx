import React from 'react'
import { mount } from 'enzyme'
import Cohabitants from './Cohabitants'

describe('The cohabitants component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
  })

  it('performs updates ', () => {
    let updates = 0
    const expected = {
      name: 'cohabitants',
      onUpdate: () => { updates++ }
    }

    const component = mount(<Cohabitants {...expected} />)
    expect(component.find('.cohabitants').length).toEqual(1)
    component.find('.has-cohabitant .yes input').simulate('change')
    component.find('.has-cohabitant .no input').simulate('change')
    expect(updates).toBe(2)
  })
})
