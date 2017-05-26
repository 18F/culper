import React from 'react'
import { mount } from 'enzyme'
import Domestic from './Domestic'

describe('The BirthPlace component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'domestic'
    }
    const component = mount(<Domestic {...expected} />)
    expect(component.find('.birthplace-domestic').length).toBe(1)
    expect(component.find('.state').length).toBe(1)
    expect(component.find('.city').length).toBe(1)
    expect(component.find('.county').length).toBe(1)
  })

  it('updates fields', () => {
    let updates = 0
    const expected = {
      name: 'domestic',
      onUpdate: () => {
        updates++
      },
      hideCounty: false
    }

    const component = mount(<Domestic {...expected} />)
    component.find('.state input').simulate('change', { target: {value: 'VA'} })
    component.find('.city input').simulate('change')
    component.find('.county input').simulate('change')
    expect(updates).toBe(3)
  })

  it('renders without county', () => {
    const expected = {
      name: 'domestic',
      hideCounty: true
    }

    const component = mount(<Domestic {...expected} />)
    expect(component.find('.county').length).toBe(0)
  })
})
