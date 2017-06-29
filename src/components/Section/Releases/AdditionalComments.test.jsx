import React from 'react'
import { mount } from 'enzyme'
import AdditionalComments from './AdditionalComments'

describe('The AdditionalComments Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => { updates++ }
    }
    const component = mount(<AdditionalComments {...expected} />)
    expect(component.find('.additional-comments').length).toBe(1)
    component.find('.fullname input').simulate('change')
    expect(updates).toBe(1)
  })
})
