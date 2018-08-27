import React from 'react'
import { mount } from 'enzyme'
import AdditionalComments from './AdditionalComments'

describe('The AdditionalComments Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<AdditionalComments {...expected} />)
    updates = 0
    component.find('.signature button').simulate('click')
    expect(updates).toBe(1)
  })
})
