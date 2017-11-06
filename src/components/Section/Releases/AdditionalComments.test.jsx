import React from 'react'
import { mount } from 'enzyme'
import AdditionalComments from './AdditionalComments'

describe('The AdditionalComments Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      AdditionalComments: {
        value: 'my two cents'
      },
      onUpdate: () => { updates++ }
    }
    const component = mount(<AdditionalComments {...expected} />)
    expect(component.find('.additional-comments').length).toBe(1)
    updates = 0
    component.find('.comments textarea').simulate('change')
    component.find('.signature button').simulate('click')
    expect(updates).toBe(2)
  })
})
