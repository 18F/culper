import React from 'react'
import { mount } from 'enzyme'
import OtherName from './OtherName'

describe('The other name componen (in Relationships)', () => {
  it('can update', () => {
    let updates = 0
    const props = {
      onUpdate: () => updates++
    }
    const component = mount(<OtherName {...props} />)
    component.find('.name .first input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.datesused .to .day input').simulate('change')
    expect(updates).toBe(3)
  })
})
