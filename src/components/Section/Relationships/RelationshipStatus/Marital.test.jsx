import React from 'react'
import { mount } from 'enzyme'
import Marital from './Marital'

describe('The relationship status component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
  })

  it('performs updates', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      onUpdate: () => { updates++ }
    }

    const component = mount(<Marital {...expected} />)
    expect(component.find('.marital').length).toEqual(1)
    component.find('.status-options input[value="InCivilUnion"]').simulate('change')
    component.find('.civil-union .civil input#first').simulate('change')
    component.find('.status-options input[value="Never"]').simulate('change')
    expect(updates).toBe(3)
  })
})
