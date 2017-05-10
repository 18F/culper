import React from 'react'
import { mount } from 'enzyme'
import Employment from './Employment'

describe('The foreign business job offer component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      name: 'foreign-business-employment',
      HasForeignEmployment: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<Employment {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
    component.find('.employment-name .first input').simulate('change')
    component.find('.employment-description textarea').simulate('change')
    component.find('.employment-date .day input').simulate('change')
    component.find('.employment-address .mailing input').simulate('change')
    component.find('.employment-accepted .yes input').simulate('change')
    component.find('.employment-explanation textarea').simulate('change')
    expect(updates).toBe(7)
  })
})
