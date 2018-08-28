import React from 'react'
import { mount } from 'enzyme'
import RevokedItem from './RevokedItem'

describe('The legal investigations revoked item component', () => {
  it('can update', () => {
    let updates = 0
    const onUpdate = () => {
      updates++
    }
    const component = mount(<RevokedItem onUpdate={onUpdate} />)
    component
      .find('.legal-investigations-revoked-date .year input')
      .simulate('change')
    component
      .find('.legal-investigations-revoked-agency input')
      .simulate('change')
    component
      .find('.legal-investigations-revoked-explanation textarea')
      .simulate('change')
    expect(updates).toBe(3)
  })
})
