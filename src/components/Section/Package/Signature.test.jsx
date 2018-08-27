import React from 'react'
import { mount } from 'enzyme'
import Signature from './Signature'

describe('The Signature Release component', () => {
  it('trigger updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = mount(<Signature {...expected} />)
    expect(component.find('.signature').length).toBe(1)
    component.find('button').simulate('click')
    expect(updates).toBe(1)
  })

  it('displays name and date', () => {
    const now = new Date()
    const name = {
      first: 'Bob',
      middle: 'Joe',
      last: 'Smith'
    }
    const expected = {
      Name: name,
      LegalName: {
        Name: name
      },
      Date: {
        date: now,
        month: `${now.getMonth() + 1}`,
        day: `${now.getDate()}`,
        year: `${now.getFullYear()}`
      }
    }
    const component = mount(<Signature {...expected} />)
    expect(component.find('.name.wet').text()).toBe(
      `${name.first} ${name.middle} ${name.last}`
    )
    expect(component.find('.date.wet').text()).toBe(
      `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
    )
  })

  it('handles defaults', () => {
    expect(Signature.defaultProps.onUpdate()).toEqual(undefined)
    expect(Signature.defaultProps.onError(null, [])).toEqual([])
  })
})
