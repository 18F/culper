import React from 'react'
import { mount } from 'enzyme'
import Infractions from './Infractions'

describe('The infractions component', () => {
  it('can select and then deselect an item', () => {
    let values = ['Repossession']
    const expected = {
      name: 'infractions',
      values: values,
      onUpdate: obj => {
        values = obj.values
      }
    }
    const component = mount(<Infractions {...expected} />)
    expect(values.length).toEqual(1)
    component.find('.nonpayment-repossession input').simulate('change')
    expect(values.length).toEqual(0)
  })

  it('can select multiple items', () => {
    let values = ['Repossession']
    const expected = {
      name: 'infractions',
      values: values,
      onUpdate: obj => {
        values = obj.values
      }
    }
    const component = mount(<Infractions {...expected} />)
    expect(values.length).toEqual(1)
    component.find('.nonpayment-evicted input').simulate('change')
    expect(values.length).toEqual(2)
  })
})
