import React from 'react'
import { mount } from 'enzyme'
import ManipulatingItem from './ManipulatingItem'

describe('The legal investigations unauthorized item component', () => {
  it('can update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<ManipulatingItem onUpdate={onUpdate} />)
    component
      .find('.legal-technology-manipulating-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-manipulating-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-manipulating-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-manipulating-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
