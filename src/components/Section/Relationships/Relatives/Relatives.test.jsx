import React from 'react'
import { mount } from 'enzyme'
import Relatives from './Relatives'

describe('The relatives component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'relatives'
    }

    const component = mount(<Relatives {...expected} />)
    expect(component.find('.accordion').length).toEqual(1)
  })

  it('triggers updates when changing values', () => {
    let updates = 0
    const expected = {
      name: 'relatives',
      List: {
        items: [{ Item: { Relation: { value: 'Mother' } } }]
      },
      onUpdate: obj => {
        updates++
      }
    }
    const component = mount(<Relatives {...expected} />)
    component.find({ type: 'radio', value: 'Mother' }).simulate('change')
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: 'The name' } })
    component
      .find('.relative-name .first input')
      .simulate('change', { target: { name: 'first', value: '123123123' } })
    expect(updates).toBeGreaterThan(1)
  })
})
