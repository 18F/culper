import React from 'react'
import { mount } from 'enzyme'
import Signature from './Signature'

describe('The Signature Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<Signature {...expected} />)
    expect(component.find('.signature').length).toBe(1)
    component.find('button').simulate('click')
    expect(updates).toBe(1)
  })
})
