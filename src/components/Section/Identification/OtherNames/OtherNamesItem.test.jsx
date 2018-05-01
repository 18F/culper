import React from 'react'
import OtherNameItem from './OtherNameItem'
import { mount } from 'enzyme'

describe('The other names item component', () => {
  it('can update fields', () => {
    let updates = 0
    const props = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<OtherNameItem {...props} />)
    component.find('.first input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.datecontrol .from .day input').simulate('change')
    component.find('.reason textarea').simulate('change')
    expect(updates).toBeGreaterThan(0)
  })
})
