import React from 'react'
import { mount } from 'enzyme'
import Foreign from './Foreign'

describe('The military foreign component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'military-foreign'
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.branch').length).toBeGreaterThan(1)
    expect(component.find('.collection').length).toEqual(0)
  })

  it('selecting no to military foreign does nothing', () => {
    const expected = {
      name: 'military-foreign'
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.collection').length).toEqual(0)
    component.find('.branch .no input').simulate('change')
    expect(component.find('.collection').length).toEqual(0)
  })

  it('selecting yes to military foreign displays the form', () => {
    const expected = {
      name: 'military-foreign'
    }
    const component = mount(<Foreign {...expected} />)
    expect(component.find('.collection').length).toEqual(0)
    component.find('.branch .yes input').simulate('change')
    expect(component.find('.collection').length).toEqual(1)
  })
})
