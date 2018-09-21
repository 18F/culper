import React from 'react'
import { mount } from 'enzyme'
import Passport from './Passport'

describe('The passport component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'passport'
    }
    const component = mount(<Passport name={expected.name} />)
    expect(component.find('.first input').length).toEqual(0)
    expect(component.find('.number input').length).toEqual(0)
    expect(component.find('.month input').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display passport field if "Yes" is selected', () => {
    const expected = {
      name: 'passport',
      HasPassports: { value: 'Yes' }
    }
    const component = mount(<Passport {...expected} />)
    expect(component.find('.number input').length).toEqual(1)
    expect(component.find('.month input').length).toEqual(2)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('display no passport information if "No" is selected', () => {
    const expected = {
      name: 'passport',
      HasPassports: { value: 'No' }
    }
    const component = mount(<Passport name={expected.name} HasPassport="No" />)
    expect(component.find('.first input').length).toEqual(0)
    expect(component.find('.number input').length).toEqual(0)
    expect(component.find('.month input').length).toEqual(0)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('displays suggested names if found', () => {
    let first = ''
    const expected = {
      name: 'passport',
      HasPassports: { value: 'Yes' },
      onUpdate: values => {
        first = values.Name.first
      },
      suggestedNames: [
        {
          first: 'john',
          last: 'smith'
        },
        {
          first: 'jonathan',
          last: 'smith'
        }
      ]
    }
    const component = mount(<Passport {...expected} />)
    expect(component.find('.modal').length).toEqual(1)
    component
      .find('.suggestion .action button')
      .first()
      .simulate('click')
    expect(first).toEqual(expected.suggestedNames[0].first)
  })

  it('loads data and adds comment', () => {
    const data = {
      Card: { value: 'Book' },
      Comments: { value: 'Comment' },
      Issued: {
        day: '1',
        estimated: false,
        month: '1',
        name: 'issued',
        year: '2003'
      },
      Expiration: {
        day: '1',
        estimated: false,
        month: '1',
        name: 'expiration',
        year: '2004'
      },
      HasPassports: { value: 'Yes' },
      Name: {
        first: 'John',
        last: 'Doe',
        middle: 'S',
        middleInitialOnly: true,
        name: 'name',
        suffix: 'Jr'
      },
      Number: {
        name: 'number',
        value: '123456789'
      }
    }
    const component = mount(<Passport {...data} name={'passport'} />)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
    component.find('.branch .yes input').simulate('change')
    component.find('.name .first input').simulate('change')
    component.find('.passport-number input').simulate('change')
    component.find('.passport-issued .day input').simulate('change')
    component.find('.passport-expiration .day input').simulate('change')
  })

  it('can render with regular expression for passport book', () => {
    const props = {
      HasPassports: { value: 'Yes' },
      Issued: {
        day: '1',
        estimated: false,
        month: '1',
        name: 'issued',
        year: '2003'
      },
      Card: { value: 'Book' },
      reBook: 'test'
    }
    const component = mount(<Passport {...props} />)
    expect(component.find('.number').length).toBe(1)
    expect(component.find('[pattern="test"]').length).toBe(1)
  })
})
