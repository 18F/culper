import React from 'react'
import { mount } from 'enzyme'
import Passport from './Passport'

describe('The passport component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport name={expected.name} />)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })

  it('display passport field if "Yes" is selected', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport name={expected.name} HasPassport="Yes" />)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(1)
    expect(component.find('input#month').length).toEqual(2)
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })

  it('display no passport information if "No" is selected', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport name={expected.name} HasPassport="No" />)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('div.hidden').length).toBeGreaterThan(0)
  })
})
