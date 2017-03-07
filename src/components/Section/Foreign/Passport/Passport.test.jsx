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
    expect(component.find('input#number').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display passport field if "Yes" is selected', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport {...expected} />)
    component.find({type: 'radio', name: 'has_passport', value: 'Yes'}).simulate('change')
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#number').length).toEqual(1)
    expect(component.find('input#month').length).toEqual(2)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display no passport information if "No" is selected', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport name={expected.name} HasPassport="No" />)
    expect(component.find('input[name="has_passport"]').length).toEqual(2)
    expect(component.find('input#first').length).toEqual(0)
    expect(component.find('input#number').length).toEqual(0)
    expect(component.find('input#month').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('loads data and adds comment', () => {
    const data = {
      Card: 'Book',
      Comments: 'Comment',
      Issued: {
        day: '1',
        estimated: null,
        month: '1',
        name: 'issued',
        year: '2003'
      },
      Expiration: {
        day: '1',
        estimated: null,
        month: '1',
        name: 'expiration',
        year: '2004'
      },
      HasPassport: 'Yes',
      Name: {
        first: 'John',
        last: 'Doe',
        middle: 'S',
        name: 'name',
        suffix: 'Jr'
      },
      Number: {
        name: 'number',
        value: 'C1234567'
      }
    }
    const component = mount(<Passport {...data} name={'passport'} />)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    component.find({type: 'radio', name: 'passport-card', value: 'Card'}).simulate('change')
    expect(component.find({type: 'radio', name: 'passport-card', value: 'Card'}).hasClass('selected')).toBe(true)
  })
})
