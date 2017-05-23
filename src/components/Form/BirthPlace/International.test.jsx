import React from 'react'
import { mount } from 'enzyme'
import International from './International'

describe('The International Birthplace component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'domestic'
    }
    const component = mount(<International {...expected} />)
    expect(component.find('.birthplace-international').length).toBe(1)
    expect(component.find('.city').length).toBe(1)
    expect(component.find('.country').length).toBe(1)
  })

  it('updates fields', () => {
    let updates = 0
    const expected = {
      name: 'domestic',
      onUpdate: () => {
        updates++
      }
    }

    const component = mount(<International {...expected} />)
    component.find('.city input').simulate('change')
    component.find('.country input').simulate('change', { target: { value: 'United States' } })
    expect(updates).toBe(2)
  })
})
