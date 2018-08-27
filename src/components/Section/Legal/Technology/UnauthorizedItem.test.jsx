import React from 'react'
import { mount } from 'enzyme'
import UnauthorizedItem from './UnauthorizedItem'

describe('The legal investigations unauthorized item component', () => {
  it('can update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<UnauthorizedItem onUpdate={onUpdate} />)
    component
      .find('.legal-technology-unauthorized-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-unauthorized-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-unauthorized-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-unauthorized-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
