import React from 'react'
import { mount } from 'enzyme'
import History from './History'

describe('The military history component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-history'
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting no to military service does nothing', () => {
    const expected = {
      name: 'military-history'
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
    component.find('.served .no input').simulate('change')
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
  })

  it('selecting yes to military service displays the form', () => {
    const expected = {
      name: 'military-history'
    }
    const component = mount(<History {...expected} />)
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(0)
    component.find('.served .yes input').simulate('change')
    expect(component.find('.served').length).toEqual(1)
    expect(component.find('.accordion').length).toEqual(1)
  })
})
