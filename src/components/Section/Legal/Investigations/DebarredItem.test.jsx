import React from 'react'
import { mount } from 'enzyme'
import DebarredItem from './DebarredItem'

describe('The legal investigations debarred item component', () => {
  it('can update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<DebarredItem onUpdate={onUpdate} />)
    component
      .find('.legal-investigations-debarred-date .year input')
      .simulate('change')
    component
      .find('.legal-investigations-debarred-agency input')
      .simulate('change')
    component
      .find('.legal-investigations-debarred-explanation textarea')
      .simulate('change')
    expect(updates).toBe(3)
  })
})
