import React from 'react'
import { mount } from 'enzyme'
import UnlawfulItem from './UnlawfulItem'

describe('The legal investigations unlawful item component', () => {
  it('can update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<UnlawfulItem onUpdate={onUpdate} />)
    component
      .find('.legal-technology-unlawful-date .year input')
      .simulate('change', { target: { value: '2000' } })
    component
      .find('.legal-technology-unlawful-incident textarea')
      .simulate('change')
    component
      .find('.legal-technology-unlawful-location .city input')
      .simulate('change')
    component
      .find('.legal-technology-unlawful-action textarea')
      .simulate('change')
    expect(updates).toBe(4)
  })
})
