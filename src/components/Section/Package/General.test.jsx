import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import General from './General'

describe('The General Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(
      <MemoryRouter>
        <General {...expected} />
      </MemoryRouter>
    )
    expect(component.find('.general-release').length).toBe(1)
    component.find('.signature button').simulate('click')
    expect(updates).toBe(1)
  })

  it('handles defaults', () => {
    expect(General.defaultProps.onUpdate()).toEqual(undefined)
    expect(General.defaultProps.onError(null, [])).toEqual([])
  })
})
