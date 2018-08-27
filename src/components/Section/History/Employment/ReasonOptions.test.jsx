import React from 'react'
import { mount } from 'enzyme'
import ReasonOptions from './ReasonOptions'

describe('The reason options component', () => {
  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'peace_i_am_out',
      Reason: { value: 'Fired' },
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<ReasonOptions {...expected} />)
    component.find('textarea').simulate('change')
    component
      .find({ type: 'text', name: 'month' })
      .simulate('change', { target: { value: '1' } })
    component.find({ type: 'radio', value: 'Quit' }).simulate('change')
    expect(updates).toBe(3)
  })
})
