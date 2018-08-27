import React from 'react'
import { mount } from 'enzyme'
import NotApplicable from './NotApplicable'

describe('The not applicable component', () => {
  it('displays checkbox button for not applicable along with children', () => {
    const expected = {
      name: 'notApplicable'
    }

    const component = mount(
      <NotApplicable {...expected}>
        <input type="text" name="inside" />
      </NotApplicable>
    )
    expect(component.find({ type: 'checkbox' }).length).toEqual(1)
    expect(component.find({ type: 'text' }).length).toEqual(1)
  })

  it('displays checkbox button for not applicable along with children', () => {
    let updates = 0
    const expected = {
      name: 'notApplicable',
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(
      <NotApplicable {...expected}>
        <input type="text" name="inside" />
      </NotApplicable>
    )
    component.find({ type: 'checkbox' }).simulate('change')
    expect(component.find({ type: 'text' }).nodes[0].disabled).toBe(true)
    expect(updates).toEqual(1)
  })
})
