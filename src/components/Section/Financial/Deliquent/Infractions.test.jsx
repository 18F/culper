import React from 'react'
import { mount } from 'enzyme'
import Infractions from './Infractions'

describe('The infractions component', () => {
  it('can select and then deselect an item', () => {
    let values = ['Alimony']
    const expected = {
      name: 'infractions',
      value: values,
      onUpdate: (obj) => {
        values = obj.value
      }
    }
    const component = mount(<Infractions {...expected} />)
    expect(values.length).toEqual(1)
    component.find('.deliquent-alimony input').simulate('change')
    expect(values.length).toEqual(0)
  })

  it('can select multiple items', () => {
    let values = ['Alimony']
    const expected = {
      name: 'infractions',
      value: values,
      onUpdate: (obj) => {
        values = obj.value
      }
    }
    const component = mount(<Infractions {...expected} />)
    expect(values.length).toEqual(1)
    component.find('.deliquent-federal input').simulate('change')
    expect(values.length).toEqual(2)
  })
})
