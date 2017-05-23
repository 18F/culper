import React from 'react'
import { mount } from 'enzyme'
import BirthPlace from './Birthplace'

describe('The BirthPlace component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'birthplace'
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find('.birthplace-domestic').length).toBe(0)
    expect(component.find('.birthplace-international').length).toBe(0)
  })

  it('renders domestic fields', () => {
    const expected = {
      name: 'birthplace',
      domestic: 'Yes'
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find('.birthplace-domestic').length).toBe(1)
    expect(component.find('.birthplace-international').length).toBe(0)
  })

  it('updates domestic fields', () => {
    let updates = 0
    const expected = {
      name: 'birthplace',
      domestic: 'Yes',
      onUpdate: () => { updates++ }
    }
    const component = mount(<BirthPlace {...expected} />)
    component.find('.birthplace-domestic .city input').simulate('change')
    expect(updates).toBe(1)
  })

  it('renders international fields', () => {
    const expected = {
      name: 'birthplace',
      domestic: 'No'
    }
    const component = mount(<BirthPlace {...expected} />)
    expect(component.find('.birthplace-international').length).toBe(1)
    expect(component.find('.birthplace-domestic').length).toBe(0)
  })

  it('updates international fields', () => {
    let updates = 0
    const expected = {
      name: 'birthplace',
      domestic: 'No',
      onUpdate: () => { updates++ }
    }
    const component = mount(<BirthPlace {...expected} />)
    component.find('.birthplace-international .city input').simulate('change')
    expect(updates).toBe(1)
  })
})
