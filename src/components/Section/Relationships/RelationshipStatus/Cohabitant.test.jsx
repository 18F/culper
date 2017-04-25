import React from 'react'
import { mount } from 'enzyme'
import Cohabitant from './Cohabitant'

describe('The cohabitant component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'cohabitant'
    }

    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.cohabitant').length).toEqual(1)
  })

  it('updates values', () => {
    let updates = 0
    const expected = {
      name: 'cohabitant',
      onUpdate: () => { updates++ },
      SSN: {}
    }

    const component = mount(<Cohabitant {...expected} />)
    expect(component.find('.cohabitant').length).toEqual(1)
    component.find('.cohabitant-name input#first').simulate('change')
    component.find('.birthdate input#month').simulate('change', { target: { value: '12' } })
    component.find('.birthplace .no input').simulate('change')
    component.find('.maiden-name .yes input').simulate('change')
    component.find('.foreign-born-documents input').first().simulate('click')
    component.find('.foreign-born-documents .other input').simulate('click')
    component.find('.foreign-born-documents textarea#otherExplanation').simulate('change')
    component.find('.foreign-born-documents input#documentNumber').simulate('change')
    component.find('.foreign-born-documents input#month').simulate('change', { target: { value: '12' } })
    component.find('.ssn input#first').simulate('change')
    component.find('.othername input#first').simulate('change')
    component.find('.othername .maiden-name .yes input').simulate('change')
    component.find('.othername .from input#month').simulate('change', { target: { value: '12' } })
    component.find('.othername input[name="OtherNameNotApplicable"]').simulate('change')
    component.find('.cohabitation-began input#month').simulate('change', { target: { value: '12' } })
    expect(updates).toBe(15)
  })

  it('shows suggestion and marks as not spouse', () => {
    const expected = {
      name: 'cohabitant',
      onUpdate: () => {},
      SameSpouse: true,
      spouse: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      Name: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      SSN: {}
    }

    const component = mount(<Cohabitant {...expected} />)
    component.find('.cohabitant-name input#first').simulate('change', { target: { value: 'Foo' } })
    expect(component.find('.spouse-suggestion').length).toBe(1)
    component.find('.cohabitant-name input#first').simulate('blur')
    expect(component.find('.spouse-suggestion .suggestion-btn').length).toBe(1)
    component.find('.spouse-suggestion .suggestion-btn').simulate('click')
  })

  it('shows suggestion and closes', () => {
    const expected = {
      name: 'cohabitant',
      onUpdate: () => {},
      SameSpouse: true,
      spouse: {
        first: 'Foo',
        middle: 'FB',
        last: 'Far'
      },
      Name: {
        first: 'Foo',
        firstInitialOnly: false,
        middle: 'FB',
        middleInitialOnly: false,
        noMiddleName: false,
        last: 'Bar',
        lastInitialOnly: false,
        suffix: ''
      },
      SSN : {}
    }

    const component = mount(<Cohabitant {...expected} />)
    component.find('.cohabitant-name input#first').simulate('change', { target: { value: 'Foo' } })
    expect(component.find('.spouse-suggestion').length).toBe(1)
    component.find('.cohabitant-name input#first').simulate('blur')
    expect(component.find('.spouse-suggestion .suggestion-btn').length).toBe(1)
    component.find('.spouse-suggestion a').simulate('click')
  })
})
